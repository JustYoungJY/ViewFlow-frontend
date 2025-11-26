


export default function AuthButton({ onLoginClick, onRegisterClick }) {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={onLoginClick}
                className="w-full sm:w-auto px-4 py-2 rounded-full font-semibold text-white transition-all duration-300
                 whitespace-nowrap bg-transparent border border-[#2D2A4A] hover:bg-[#2D2A4A] text-[#A6A4B0] hover:text-white"
            >
                Вход
            </button>
            <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto px-4 py-2 rounded-full font-semibold text-white
                 transition-all duration-300 whitespace-nowra bg-gradient-to-r from-[#5B7FFF] to-[#A259FF]
                  hover:from-[#4a6cd6] hover:to-[#8c49e0] shadow-lg shadow-purple-500/30"
            >
                Регистрация
            </button>
        </div>
    );
};