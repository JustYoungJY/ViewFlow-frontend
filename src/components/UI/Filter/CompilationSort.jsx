export default function CompilationSort({sortBy, onSortByChange, sortDirection, onSortDirectionChange}) {

    const handleSort = (field) => {
        let newDir = sortDirection;
        if (sortBy === field) {
            newDir = sortDirection === 'desc' ? 'asc' : 'desc';
        } else {
            newDir = 'desc';
        }
        onSortByChange(field);
        onSortDirectionChange(newDir);
    };

    const sortOptions = [
        {key: 'popularity', label: 'Популярности'},
        {key: 'likes', label: 'Лайкам'},
        {key: 'movieCount', label: 'Кол-ву фильмов'},
        {key: 'newest', label: 'Новизне'},
    ];

    return (
        <div className="flex-shrink-0 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#A6A4B0] hidden sm:block">Сортировать по:</span>
            {sortOptions.map(({key, label}) => (
                <button
                    key={key}
                    onClick={() => handleSort(key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all
                        ${sortBy === key
                        ? 'bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white shadow-lg shadow-purple-500/30'
                        : 'bg-[#1a162c] text-[#A6A4B0] hover:bg-[#2D2A4A]'
                    }`}
                >
                    <span>{label}</span>
                    {sortBy === key && (
                        <span className="material-symbols-outlined text-base transition-transform duration-200"
                              style={{transform: sortDirection === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                            arrow_downward
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}