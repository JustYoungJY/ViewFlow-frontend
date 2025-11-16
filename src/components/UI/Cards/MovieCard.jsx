import {Link} from 'react-router-dom';

export default function MovieCard({movie}) {
    return (
        <Link to={`/movie/${movie.id}`}
              className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover"/>
            <div className="p-4 bg-[#191825]">
                <h3 className="text-white font-semibold line-clamp-1">{movie.title}</h3>
                <p className="text-[#A6A4B0] text-sm">{movie.year} • {movie.genre}</p>
                <p className="text-[#FFD700] text-sm">★ {movie.rating}</p>
            </div>
        </Link>
    );
}