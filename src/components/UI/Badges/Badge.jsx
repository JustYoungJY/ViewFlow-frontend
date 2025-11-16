export default function Badge({children, type}) {

    let baseClasses = "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md"; // Добавлен shadow-md

    switch (type) {
        case "release":
            baseClasses += " bg-gradient-to-r from-blue-500 to-purple-600 text-white";
            break;
        case "new":
            baseClasses += " bg-yellow-500 text-gray-900";
            break;
        case "trend":
            baseClasses += " bg-red-600 text-white";
            break;
        default:
            baseClasses += " bg-gray-700 text-white";
    }

    return (
        <span className={baseClasses}>
            {children}
        </span>
    )
}