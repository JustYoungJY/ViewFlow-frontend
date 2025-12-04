import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
    // Formatted genres string
    const limitedGenresString = Array.isArray(movie.genres)
        ? movie.genres.slice(0, 2).join(", ")
        : "";

    // Formatted rating string
    const formattedRating = movie.rating
        ? Number(movie.rating).toFixed(1)
        : null;

    return (
        <Link
            to={`/movie/${movie.mediaId}`}
            className="group relative flex flex-col h-full bg-[#191825] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-white/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
            {/* An image container with a fixed aspect ratio 2:3 */}
            <div className="relative aspect-[2/3] overflow-hidden bg-[#0F0A1F]">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterUrl}`}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#191825]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                {/* Rating badge on top of the poster */}
                {formattedRating && (
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-white text-xs font-bold">{formattedRating}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-3">
                {/* Title */}
                <h3
                    className="text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2 mb-1 group-hover:text-[#5B7FFF] transition-colors"
                    title={movie.title}
                >
                    {movie.title}
                </h3>

                {/* Year and genres */}
                <div className="mt-auto pt-2 flex items-center justify-between text-xs text-[#A6A4B0]">
                    <span className="font-medium">{movie.year}</span>
                    <span className="truncate max-w-[80%] text-right opacity-80" title={limitedGenresString}>
                        {limitedGenresString}
                    </span>
                </div>
            </div>
        </Link>
    );
}