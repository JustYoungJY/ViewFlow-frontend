export default function SelectionDetails({description, stats}) {
    return (
        <section className="max-w-5xl mx-auto px-4 py-12">
            <div
                className="relative max-w-3xl mx-auto bg-[#1a162c] p-8 md:p-12 rounded-xl shadow-2xl border border-[#2D2A4A]">
                <span
                    className="material-symbols-outlined absolute top-0 left-6 -translate-y-1/2 text-7xl text-[#5B7FFF]/20">
                    format_quote
                </span>
                <p className="relative text-lg md:text-xl text-[#A6A4B0] italic text-center leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <StatBox value={stats.movieCount} label="Фильмов"/>
                <StatBox value={stats.totalDuration} label="Общая длительность"/>
                <StatBox value={stats.avgRating} label="Средняя оценка"/>
            </div>
        </section>
    );
}


function StatBox({value, label}) {
    return (
        <div
            className="flex flex-col gap-1 rounded-xl border border-[#2D2A4A] bg-[#1a162c]/50 p-6 text-center shadow-lg">
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-sm font-normal text-[#A6A4B0]">{label}</p>
        </div>
    );
}
