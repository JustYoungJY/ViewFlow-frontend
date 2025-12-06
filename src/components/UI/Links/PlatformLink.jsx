


export default function PlatformLink({ name, link ,buttonText = "Смотреть" }) {
    const handleButtonClick = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };

    const isDisabled = !link;

    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-md backdrop-blur-sm">
            <p className="font-semibold text-lg">{name}</p>
            <button
                onClick={handleButtonClick}
                disabled={isDisabled}
                className={`
                    px-5 py-2 text-sm font-bold text-white rounded-md transition-opacity 
                    ${isDisabled
                    ? 'bg-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90'
                }
                `}
            >
                {buttonText}
            </button>
        </div>
    );
}
