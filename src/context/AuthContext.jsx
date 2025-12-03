import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import instance from '../api/axiosInstance.js';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCurrentUser = useCallback(async () => {
        const accessToken = localStorage.getItem('authToken');
        if (!accessToken) {
            setCurrentUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await instance.get('/user/info');
            setCurrentUser(response.data);
        } catch (error) {
            console.error("Ошибка получения данных пользователя:", error);
            setCurrentUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const login = (token, refreshToken) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        fetchCurrentUser();
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        isLoading,
        isAuthenticated: !!currentUser,
        login,
        logout,
        refreshUser: fetchCurrentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};