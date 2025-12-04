


export default function SortSelector({sortBy, onSortChange}) {
    const sortOptions = [
        {key: 'RATING', label: 'Рейтинг'},
        {key: 'NUM_VOTE', label: 'Количество оценок'},
        {key: 'YEAR', label: 'Год выхода'},
    ];

    const handleSort = (key) => {
        let newDir = 'desc';
        onSortChange(key, newDir);
    };

    return (
        <div className="mb-6">
            <label className="block text-[#A6A4B0] text-sm mb-3">Сортировка</label>
            <div className="flex flex-wrap gap-2">
                {sortOptions.map(({key, label}) => (
                    <button
                        key={key}
                        onClick={() => handleSort(key)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all
                            ${sortBy === key
                            ? 'bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white shadow-lg shadow-purple-500/30'
                            : 'bg-[#191825] text-[#A6A4B0] border border-[#2D2A4A] hover:bg-[#2D2A4A]'
                        }`}
                    >
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}