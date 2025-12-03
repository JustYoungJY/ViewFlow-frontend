import React from 'react';

// Formatter
const formatDuration = (minutes) => {
    if (!minutes || minutes < 1) return '0 мин';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    let result = '';
    if (hours > 0) {
        result += `${hours} ч`;
    }
    if (mins > 0) {
        result += `${hours > 0 ? ' ' : ''}${mins} мин`;
    }
    return result.trim();
};

export default function SelectionDetails({ description, stats }) {
    const { movieCount, likes, date, totalDuration, avgRating } = stats;

    return (
        <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
            <div className="bg-[#1a162c] rounded-2xl p-6 md:p-8 shadow-xl border border-white/5">

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 pb-8 border-b border-white/10">

                    {/* Count of media */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Фильмов</span>
                        <div className="flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-[#5B7FFF]">movie</span>
                            <span className="text-2xl font-bold">{movieCount}</span>
                        </div>
                    </div>

                    {/* Total duration */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Длительность</span>
                        <div className="flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-[#5B7FFF]">schedule</span>
                            <span className="text-2xl font-bold whitespace-nowrap">
                                {formatDuration(totalDuration)}
                            </span>
                        </div>
                    </div>

                    {/* Average rating */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Средний рейтинг</span>
                        <div className="flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-yellow-500">star</span>
                            <span className="text-2xl font-bold">{avgRating > 0 ? avgRating : '-'}</span>
                        </div>
                    </div>

                    {/* Date of creation */}
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Создано</span>
                        <div className="flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-[#5B7FFF]">calendar_today</span>
                            <span className="text-lg font-bold">{date}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                    <h3 className="text-lg font-bold text-white mb-2">О подборке</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {description || "Автор не добавил описание к этой подборке."}
                    </p>
                </div>
            </div>
        </div>
    );
}
