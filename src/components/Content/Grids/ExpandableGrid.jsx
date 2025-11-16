import {useState} from "react";


export default function ExpandableGrid({
                                           items,
                                           renderItem,
                                           initialLimit = 8,
                                           incrementBy = 8,
                                           gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                       }) {
    const [visibleCount, setVisibleCount] = useState(initialLimit);

    const currentItems = items.slice(0, visibleCount);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + incrementBy);
    }

    const handleCollapse = () => {
        setVisibleCount(initialLimit);
    }

    const showShowMoreButton = visibleCount < items.length;
    const showCollapseButton = visibleCount > initialLimit;


    return (
        <>
            <div className="">
                <div className={`grid ${gridCols} gap-6`}>
                    {currentItems.map(item => (
                        <div key={item.id}>
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>


            {items.length === 0 && (
                <p className="text-[#A6A4B0] text-center col-span-full">Здесь пока ничего нет</p>
            )}


            {(showShowMoreButton || showCollapseButton) && (
                <div className="flex justify-center gap-4 mt-8">
                    {showShowMoreButton && (
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-80 shadow-lg shadow-purple-500/30"
                        >
                            Смотреть больше
                        </button>
                    )}
                    {showCollapseButton && (
                        <button
                            onClick={handleCollapse}
                            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-transparent border border-[#2D2A4A] hover:bg-[#2D2A4A] text-[#A6A4B0] hover:text-white"
                        >
                            Свернуть
                        </button>
                    )}
                </div>
            )}
        </>
    )
}