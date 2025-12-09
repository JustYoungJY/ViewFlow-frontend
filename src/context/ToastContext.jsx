import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ToastContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

const Toast = ({ id, message, type, onDismiss }) => {
    const styleMap = {
        error: "bg-red-600 border-red-700",
    };

    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = useCallback(() => {
        setIsVisible(false);
        // Match the timeout with the animation duration in CSS (300ms)
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
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
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
        // Use requestAnimationFrame to ensure DOM updates are synchronized with animation
        requestAnimationFrame(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        });
    }, []);

    const contextValue = { showToast };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}

            {toasts.length > 0 && (
                <div 
                    className="fixed top-4 right-4 z-[100] space-y-3 whitespace-pre-wrap"
                    style={{ pointerEvents: 'auto' }}
                    aria-live="polite"
                >
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            {...toast}
                            onDismiss={dismissToast}
                        />
                    ))}
                </div>
            )}
        </ToastContext.Provider>
    );
}
