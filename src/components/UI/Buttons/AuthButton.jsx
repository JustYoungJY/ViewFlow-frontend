export default function AuthButton({children, variant, onClick}) {

    const baseClasses = "w-full sm:w-auto px-4 py-2 rounded-full font-semibold text-white transition-all duration-300 whitespace-nowrap";

    let variantClasses;

    switch (variant) {
        case "primary":
            variantClasses = "bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:from-[#4a6cd6] hover:to-[#8c49e0] shadow-lg shadow-purple-500/30";
            break;
        case "secondary":
            variantClasses = "bg-transparent border border-[#2D2A4A] hover:bg-[#2D2A4A] text-[#A6A4B0] hover:text-white";
            break;
        default:
            variantClasses = "bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:from-[#4a6cd6] hover:to-[#8c49e0]";
    }

    const combinedClasses = `${baseClasses} ${variantClasses}`;

    return (
        <li>
            <button onClick={onClick} className={combinedClasses} type="button">
                {children}
            </button>
        </li>
    )

}