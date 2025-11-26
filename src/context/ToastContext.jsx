import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const Toast = ({ id, message, type, onDismiss }) => {
    const styleMap = {
        error: "bg-red-600 border-red-700",
    };

    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss(id), 300);
    }, [id, onDismiss]);

    useEffect(() => {
        const timer = setTimeout(handleDismiss, 5000);
        return () => clearTimeout(timer);
    }, [handleDismiss]);

    const icon = "error";

    return (
        <div
            className={`
                min-w-64 max-w-sm p-4 rounded-xl shadow-2xl border 
                text-white transition-all duration-300 transform 
                ${styleMap[type]}
                ${isVisible ? 'animate-slide-in' : 'animate-slide-out'}
            `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className="material-symbols-outlined mr-3 text-2xl">
                        {icon}
                    </span>
                    <p className="font-semibold">{message}</p>
                </div>
                <button
                    onClick={handleDismiss}
                    className="ml-4 text-white/80 hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>
        </div>
    );
};


export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const contextValue = { showToast };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}

            <div className="fixed top-4 right-4 z-[100] space-y-3 whitespace-pre-wrap">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onDismiss={dismissToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}