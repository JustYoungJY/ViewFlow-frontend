export default function SelectedFilters({filters, onRemove}) {
    if (!filters || filters.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {filters.map(filter => (
                <div
                    key={filter}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-full bg-[#5B7FFF]/20 text-[#a2b2ff] text-sm font-medium"
                >
                    <span>{filter}</span>
                    <button
                        onClick={() => onRemove(filter)}
                        className="text-[#a2b2ff] hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-base mt-1.5">
                            close
                        </span>
                    </button>
                </div>
            ))}
        </div>
    );
}