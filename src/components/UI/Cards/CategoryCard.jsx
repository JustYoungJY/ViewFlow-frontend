import {Link} from "react-router-dom";


export default function CategoryCard({title, description, iconUrl, linkUrl}) {

    return (
        <Link to={linkUrl} className="block group">
            <div className="p-6 md:p-8 h-full bg-[#23213A] rounded-xl border border-[#2D2A4A] shadow-lg
                        transition duration-300 transform hover:scale-[1.03] hover:border-[#5B7FFF]/50 text-center">
                <div className="mb-4 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto">
                    <img className="w-full h-full object-contain"
                         src={iconUrl}
                         alt={title}
                    />
                </div>

                <h3 className="text-white text-xl md:text-2xl font-bold truncate
                                group-hover:text-[#5B7FFF] transition duration-200">
                    {title}
                </h3>

                <p className="text-[#A6A4B0] text-sm mt-2 line-clamp-2 min-h-[40px]">
                    {description}
                </p>
            </div>
        </Link>
    )
}