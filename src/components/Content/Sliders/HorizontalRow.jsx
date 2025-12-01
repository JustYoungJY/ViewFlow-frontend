import MovieCard from "../../UI/Cards/MovieCard.jsx";


export default function HorizontalRow({title, movies}) {
    return (
        <div className="py-6 max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="flex overflow-x-scroll space-x-4 pb-4 px-1 pt-4 custom-scrollbar">
                {movies.map(movie => (
                    <div className="flex-shrink-0 w-56 snap-start" key={movie.mediaId}>
                        <MovieCard movie={movie}/>
                    </div>
                ))}
            </div>
        </div>
    );
}