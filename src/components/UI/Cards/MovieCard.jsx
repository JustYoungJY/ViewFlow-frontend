import {Link} from 'react-router-dom';

export default function MovieCard({movie}) {

    const limitedGenresString = Array.isArray(movie.genres) ? movie.genres.slice(0, 2).join(", ")
        : "";

    return (
        <Link to={`/movie/${movie.mediaId}`}
              className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img src={`https://image.tmdb.org/t/p/w500${movie.posterUrl}`} alt={movie.title} className="w-full h-80 object-cover"/>
            <div className="p-4 bg-[#191825]">
                <div className="h-16">
                    <h3 className="text-white font-semibold line-clamp-2">{movie.title}</h3>
                    <p className="text-[#A6A4B0] text-sm">{movie.year} • {limitedGenresString}</p>
                </div>
                <p className="text-[#FFD700] text-sm">★ {movie.rating}</p>
            </div>
        </Link>
    );
}