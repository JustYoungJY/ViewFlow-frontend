import MovieCard from '../../UI/Cards/MovieCard.jsx';



export default function MovieGrid({movies, currentPage, totalPages, onPageChange}) {

    if (!movies || movies.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500 text-lg">
                По вашему запросу ничего не найдено.
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {movies.map(movie => (
                    <MovieCard key={movie.mediaId} movie={movie}/>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-5 py-2.5 bg-[#2D2A4A] text-white rounded-lg hover:bg-[#5B7FFF] disabled:opacity-50 disabled:hover:bg-[#2D2A4A] transition-colors"
                    >
                        Назад
                    </button>

                    <span className="text-[#A6A4B0] font-medium">
                        Страница {currentPage + 1} из {totalPages}
                    </span>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className="px-5 py-2.5 bg-[#2D2A4A] text-white rounded-lg hover:bg-[#5B7FFF] disabled:opacity-50 disabled:hover:bg-[#2D2A4A] transition-colors"
                    >
                        Вперед
                    </button>
                </div>
            )}
        </div>
    );
}