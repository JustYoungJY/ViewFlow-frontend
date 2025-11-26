import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080/api",

    timeout: 10000,

    headers: {
        'Content-Type': 'application/json',
    }
})


let isRefreshing = false;
let failedQueue = [];

// Queue for refreshToken
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("authToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.url === '/auth/refresh') {
        config.skipAuthRefresh = true;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});




export const setupInterceptors = (showToast) => {

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (!error.response || originalRequest.skipAuthRefresh) {
                if (error.request) {
                    showToast("Ошибка сети или таймаут. Проверьте соединение.", 'error');
                } else if (!error.response) {
                    showToast("Произошла неизвестная ошибка.", 'error');
                }
                return Promise.reject(error);
            }

            const { status, data } = error.response;


            if (status === 401) {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                    showToast("Сессия истекла. Войдите снова.", 'error');
                    return Promise.reject(error);
                }

                const retryOriginalRequest = new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const refreshResponse = await instance.post('/auth/refresh', {
                            refreshToken: refreshToken
                        });

                        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;

                        localStorage.setItem('authToken', accessToken);
                        localStorage.setItem('refreshToken', newRefreshToken);

                        instance.defaults.headers.Authorization = `Bearer ${accessToken}`;

                        isRefreshing = false;
                        processQueue(null, accessToken);

                    } catch (refreshError) {
                        isRefreshing = false;
                        processQueue(refreshError, null);

                        localStorage.removeItem('authToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/login';
                        showToast("Сессия истекла. Войдите снова.", 'error');
                        return Promise.reject(refreshError);
                    }
                }

                return retryOriginalRequest.then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return instance(originalRequest);
                });
            }


            let errorMessage = "";
            if (Array.isArray(data) && data.length > 0 && data[0].field && data[0].message) {
                errorMessage = data.map(detail =>
                    `Поле "${detail.field}": ${detail.message}`
                ).join('\n');
            } else if (data && typeof data === 'object' && data.message) {
                errorMessage = data.message;
            }

            if (errorMessage) {
                showToast(errorMessage, 'error');
            } else {
                const defaultMessage = `Ошибка сервера: статус ${status}`;
                showToast(defaultMessage, 'error');
            }

            return Promise.reject(error);
        }
    );
};

export default instance;