import {Link} from "react-router-dom";

export default function RandomMovieCard({title, backgroundUrl, linkUrl}) {
    return (
        <Link to={linkUrl} className="block w-full h-auto group">
            <div
                className="rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(91,127,255,0.5)] hover:border-[#5B7FFF] border border-transparent relative">
                <img
                    className="w-full h-90 object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
                    src={backgroundUrl}
                    alt={title}
                />

                {/* Градиентный оверлей */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"/>

                {/* Название фильма (h3) */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-300 drop-shadow-2xl">
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    );
}