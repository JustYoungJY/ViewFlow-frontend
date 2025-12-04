import React from 'react';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function WatchedMediaCard({ item }) {

    const {
        mediaType,
        mediaDetails,
        progress,
        lastSeason,
        lastEpisode
    } = item;

    const title = mediaDetails?.title || 'Без названия';
    const posterPath = mediaDetails?.posterPath;
    const imageUrl = posterPath
        ? (posterPath.startsWith('http') ? posterPath : `${TMDB_IMAGE_BASE}${posterPath}`)
        : 'https://via.placeholder.com/342x513?text=No+Image';

    const year = mediaDetails?.releaseYear || '';

    // Форматирование информации о прогрессе
    const renderProgressInfo = () => {
        if (mediaType === 'TV') {
            const season = lastSeason || 1;
            const episode = lastEpisode || 1;
            return (
                <span className="text-[#5B7FFF] font-medium text-xs">
                    Сезон {season}, Серия {episode}
                </span>
            );
        } else {
            return (
                <span className="text-gray-400 text-xs">
                    {progress === 100 ? 'Просмотрено' : 'В процессе'}
                </span>
            );
        }
    };

    return (
        <div className="group relative bg-[#1a162c] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/5 h-full flex flex-col">
            {/* Poster Section */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a162c] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1" title={title}>
                        {title}
                    </h3>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-500 text-xs">{year}</span>
                        {renderProgressInfo()}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#0F0A1F] h-1.5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] transition-all duration-500"
                        style={{ width: `${progress || 0}%` }}
                    />
                </div>
            </div>
        </div>
    );
}