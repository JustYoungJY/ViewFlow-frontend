


export default function PlatformLink({ name, buttonText = "Смотреть" }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-md backdrop-blur-sm">
            <p className="font-semibold text-lg">{name}</p>
            <button className="px-5 py-2 text-sm font-bold text-white rounded-md bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90 transition-opacity">
                {buttonText}
            </button>
        </div>
    );
}
