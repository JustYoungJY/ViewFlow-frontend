import { useEffect, useState } from "react";
import instance from "../../api/axiosInstance.js";
import {useAuth} from "../../context/AuthContext.jsx";


export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
    const [mode, setMode] = useState(initialMode);
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMode(initialMode)
            setFormData({ username: "", email: "", password: "" })
        }
    }, [isOpen, initialMode])

    if (!isOpen) return null;

    const isLogin = mode === 'login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = isLogin ? "/auth/login" : "/auth/register";
            const res = await instance.post(url, formData);

            login(res.data.accessToken, res.data.refreshToken);

            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#191825]/60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-[400px] transform overflow-hidden rounded-2xl border border-white/10 bg-[#191825] p-8 shadow-2xl transition-all animate-pop-in">

                <button onClick={onClose} className="absolute right-4 top-4 text-[#A6A4B0] transition-colors hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h2 className="mb-6 text-center text-2xl font-bold text-white">
                    {isLogin ? 'Вход' : 'Регистрация'}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="group animate-fade-in">
                        <input
                            type="text"
                            name="username"
                            placeholder={isLogin ? "Имя пользователя" : "Придумайте логин"}
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-transparent bg-[#23213A] px-4 py-3 text-white placeholder-[#A6A4B0] outline-none transition-all focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF]"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="group animate-fade-in">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-transparent bg-[#23213A] px-4 py-3 text-white placeholder-[#A6A4B0] outline-none transition-all focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF]"
                                required
                            />
                        </div>
                    )}

                    <div className="group animate-fade-in">
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-transparent bg-[#23213A] px-4 py-3 text-white placeholder-[#A6A4B0] outline-none transition-all focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full rounded-lg bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isLoading && <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>}
                        {isLogin ? 'Войти' : 'Создать аккаунт'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[#A6A4B0]">
                    {isLogin ? (
                        <>
                            Нет аккаунта?{' '}
                            <button onClick={() => setMode('register')} className="bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] bg-clip-text font-bold text-transparent hover:opacity-80">
                                Зарегистрироваться
                            </button>
                        </>
                    ) : (
                        <>
                            Уже есть аккаунт?{' '}
                            <button onClick={() => setMode('login')} className="bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] bg-clip-text font-bold text-transparent hover:opacity-80">
                                Войти
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
