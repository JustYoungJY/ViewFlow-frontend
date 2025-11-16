import {Link} from "react-router-dom";


export default function ContentCard({title, description, linkUrl, backgroundUrl}) {

    return (
        <div className="w-90 h-90 flex-shrink-0 rounded-xl overflow-hidden shadow-lg transition
                        duration-300 transform hover:scale-[1.02] relative">
            <Link to={linkUrl} className="block h-full">

                <img
                    className="w-full h-full object-cover transition duration-300 hover:opacity-80"
                    src={backgroundUrl}
                    alt={title}
                />

                <div className="absolute inset-x-0 bottom-0 p-4 pt-16 text-white z-10
                bg-gradient-to-t from-black/90 via-black/40 to-transparent">

                    <div className="w-full max-w-full">
                        <h3 className="text-xl font-semibold line-clamp-2 h-12 break-words leading-tight">
                            {title}
                        </h3>

                        <p className="text-sm text-[#A6A4B0] mt-3 h-9 line-clamp-2 overflow-hidden break-words leading-tight">
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )

}