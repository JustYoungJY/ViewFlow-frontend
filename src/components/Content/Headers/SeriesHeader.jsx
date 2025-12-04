import RatingBlock from "../RatingBlock.jsx";
import { useState, useEffect } from 'react';
import instance from "../../../api/axiosInstance.js";
import { useToast } from '../../../context/ToastContext.jsx';

export default function SeriesHeader({ series }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { showToast } = useToast();

    const {
        mediaId,
        mediaType,
        title,
        year,
        description,
        country,
        genres,
        directors,
        seasons,
        episodes,
        posterUrl,
        ratings,
        generalRating
    } = series;

    const directorsString = directors && directors.length > 0 ? directors.join(", ") : null;

    // Check if series is in favorites
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const response = await instance.get("/favorites/media/status", {
                    params: { mediaId, mediaType }
                });
                setIsFavorite(response.data);
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        if (mediaId) {
            checkFavoriteStatus();
        }
    }, [mediaId, mediaType]);

    const toggleFavorite = async () => {
        try {
            await instance.post("/favorites/media", {
                mediaId,
                mediaType
            });

            setIsFavorite(!isFavorite);
            showToast(isFavorite ? "Удалено из коллекции" : "Добавлено в коллекцию", "success");
        } catch (error) {
            console.error("Error toggling favorite status:", error);
            showToast("Ошибка при обновлении коллекции", "error");
        }
    };

    // Formatted word "сезон"
    const getSeasonString = (n) => {
        if (!n) return "";
        n = Math.abs(n);
        const lastTwo = n % 100;
        const lastOne = n % 10;

        if (lastTwo >= 11 && lastTwo <= 19) {
            return `${n} сезонов`;
        } else if (lastOne === 1) {
            return `${n} сезон`;
        } else if ([2, 3, 4].includes(lastOne)) {
            return `${n} сезона`;
        } else {
            return `${n} сезонов`;
        }
    };

    // Formatted word "эпизод"
    const getEpisodeString = (n) => {
        if (!n) return "";
        n = Math.abs(n);
        const lastTwo = n % 100;
        const lastOne = n % 10;

        if (lastTwo >= 11 && lastTwo <= 19) {
            return `${n} серий`;
        } else if (lastOne === 1) {
            return `${n} серия`;
        } else if ([2, 3, 4].includes(lastOne)) {
            return `${n} серии`;
        } else {
            return `${n} серий`;
        }
    };


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
                        onClick={toggleFavorite}
                        className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition shadow-lg ${
                            isFavorite 
                            ? "bg-gradient-to-r from-[#FF6B6B] to-[#FF9F9F] hover:opacity-90" 
                            : "bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90"
                        }`}>
                        {isFavorite ? "Удалить из коллекции" : "В коллекцию"}
                    </button>
                </div>


                <div className="lg:col-span-3 space-y-4">

                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">{title} ({year})</h1>
                    </div>

                    <p className="text-[#A6A4B0] text-lg max-w-3xl">{description}</p>

                    <div className="space-y-2 pt-4 border-t border-[#2D2A4A]">

                        {/* Seasons and Episodes */}
                        <div className="flex items-center gap-4 mb-2">
                            {seasons > 0 && (
                                <span className="px-3 py-1 rounded bg-[#2D2A47] text-[#5B7FFF] font-bold border border-[#5B7FFF]/30">
                                     {getSeasonString(seasons)}
                                 </span>
                            )}
                            {episodes > 0 && (
                                <span className="px-3 py-1 rounded bg-[#2D2A47] text-gray-300 font-semibold border border-white/10">
                                     {getEpisodeString(episodes)}
                                </span>
                            )}
                        </div>

                        { country && country !== "" && (
                            <p className="text-gray-300 text-base">
                                <span className="font-semibold text-gray-200">Страна:</span> {country}
                            </p>
                        )}

                        { genres && genres.length > 0 && (
                            <p className="text-gray-300 text-base">
                                <span className="font-semibold text-gray-200">Жанры:</span>
                                <span className="text-[#A259FF] ml-1">
                                    {genres && Array.isArray(genres) ? genres.join(' • ') : genres}
                                </span>
                            </p>
                        )}

                        { directorsString && (
                            <p className="text-gray-300 text-base">
                                <span className="font-semibold text-gray-200">Создатели:</span> {directorsString}
                            </p>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1 w-full pt-2">
                    <RatingBlock
                        ratings={ratings}
                        generalRating={generalRating}
                    />
                </div>

            </div>
        </div>
    )
}
