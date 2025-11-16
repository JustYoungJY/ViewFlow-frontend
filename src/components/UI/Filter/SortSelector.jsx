import {useState} from 'react';

export default function SortSelector({sortBy, direction, onSortChange}) {
    const [activeField, setActiveField] = useState(sortBy);
    const [activeDir, setActiveDir] = useState(direction);

    const handleSort = (field) => {
        let newDir = activeDir;
        if (activeField === field) {
            newDir = activeDir === 'desc' ? 'asc' : 'desc';
        } else {
            newDir = field === 'year' || field === 'rating' || field === 'popularity' ? 'desc' : 'asc';
        }
        setActiveField(field);
        setActiveDir(newDir);
        onSortChange(field, newDir);
    };

    const sortOptions = [
        {key: 'rating', label: 'Рейтинг'},
        {key: 'year', label: 'Год'},
        {key: 'title', label: 'Название'},
        {key: 'popularity', label: 'Популярность'},
    ];

    return (
        <div className="mb-6">
            <label className="block text-[#A6A4B0] text-sm mb-3">Сортировка</label>
            <div className="flex flex-wrap gap-2">
                {sortOptions.map(({key, label}) => (
                    <button
                        key={key}
                        onClick={() => handleSort(key)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all
                            ${activeField === key
                            ? 'bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white shadow-lg shadow-purple-500/30'
                            : 'bg-[#191825] text-[#A6A4B0] border border-[#2D2A4A] hover:bg-[#2D2A4A]'
                        }`}
                    >
                        <span>{label}</span>
                        {activeField === key && (
                            <span className="material-symbols-outlined text-base transition-transform duration-200"
                                  style={{transform: activeDir === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                            arrow_downward
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}