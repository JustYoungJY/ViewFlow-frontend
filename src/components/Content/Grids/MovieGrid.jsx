import MovieCard from '../../UI/Cards/MovieCard.jsx';
import {useState} from "react";

export default function MovieGrid({movies}) {
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {currentMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>

            <div className="flex justify-center gap-2">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}
                        className="px-4 py-2 bg-[#5B7FFF] rounded disabled:opacity-50">
                    Предыдущая
                </button>
                <span className="py-2 text-[#A6A4B0]">Страница {currentPage} из {totalPages}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-[#5B7FFF] rounded disabled:opacity-50">
                    Следующая
                </button>
            </div>
        </div>
    );
}