import RatingBlock from "../RatingBlock.jsx";

export default function MovieHeader({movie}) {

    const {
        title,
        year,
        description,
        country,
        genres,
        director,
        budget,
        posterUrl,
        ratings,
        generalRating,
        viewflowRating
    } = movie;

    return (
        <div className="bg-[#191825] text-white p-8 md:p-12 lg:p-16">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-start">

                <div className="lg:col-span-1 space-y-5">
                    <img
                        className="w-full h-auto rounded-xl shadow-2xl object-cover"
                        src={posterUrl}
                        alt={title}
                    />
                    <button
                        className="w-full px-6 py-3 rounded-lg font-semibold text-white transition shadow-lg bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90">
                        В коллекцию
                    </button>
                </div>


                <div className="lg:col-span-3 space-y-4">

                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">{title} ({year})</h1>
                    </div>

                    <p className="text-[#A6A4B0] text-lg max-w-3xl">{description}</p>

                    <div className="space-y-2 pt-4 border-t border-[#2D2A4A]">
                        <p className="text-gray-300 text-base">
                            <span className="font-semibold text-gray-200">Страна:</span> {country}
                        </p>
                        <p className="text-gray-300 text-base">
                            <span className="font-semibold text-gray-200">Жанры:</span>
                            <span className="text-[#A259FF] ml-1">
                                {genres && Array.isArray(genres) ? genres.join(' • ') : genres}
                            </span>
                        </p>
                        <p className="text-gray-300 text-base">
                            <span className="font-semibold text-gray-200">Режиссер:</span> {director}
                        </p>
                        <p className="text-gray-300 text-base">
                            <span className="font-semibold text-gray-200">Бюджет:</span> {budget}
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-1 w-full pt-2">
                    <RatingBlock
                        ratings={ratings}
                        generalRating={generalRating}
                        viewflowRating={viewflowRating}
                    />
                </div>

            </div>
        </div>
    )
}