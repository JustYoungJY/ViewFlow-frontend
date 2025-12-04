import {useState, useEffect} from 'react';
import instance from '../../../api/axiosInstance.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function CompilationMovieItem({movie, authorNote, isOwner, onEditClick}) {
    const [openSection, setOpenSection] = useState(null);
    const [isMovieFavorite, setIsMovieFavorite] = useState(false);
    const { showToast } = useToast();

    const mediaId = movie.id;
    const mediaType = movie.mediaType || (movie.title.includes("сезон") ? "TV" : "MOVIE");

    // Check if movie is in favorites
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            try {
                const response = await instance.get("/favorites/media/status", {
                    params: { mediaId, mediaType }
                });
                setIsMovieFavorite(response.data);
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        if (mediaId) {
            checkFavoriteStatus();
        }
    }, [mediaId, mediaType]);

    const handleToggle = (section) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    const handleToggleMovieFavorite = async () => {
        try {
            await instance.post("/favorites/media", {
                mediaId,
                mediaType
            });

            setIsMovieFavorite(!isMovieFavorite);
            showToast(isMovieFavorite ? "Удалено из избранного" : "Добавлено в избранное", "success");
        } catch (error) {
            console.error("Error toggling favorite status:", error);
            showToast("Ошибка при обновлении избранного", "error");
        }
    };

    const isTrailerOpen = openSection === 'trailer';
    const isAuthorNoteOpen = openSection === 'author';

    return (
        <div className="flex flex-col md:flex-row gap-6">

            {/* Poster + button */}
            <div className="w-full md:w-60 lg:w-64 flex-shrink-0 space-y-4">
                <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-lg aspect-[2/3] object-cover"
                />
                <button
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                        isMovieFavorite
                            ? 'bg-[#FF6B6B] text-white'
                            : 'bg-[#121212] text-[#A6A4B0] border border-[#2D2A4A] hover:bg-[#2D2A4A] hover:text-white' // <--- Исходные стили
                    }`}
                    onClick={handleToggleMovieFavorite}>
                    <span className="material-symbols-outlined text-xl">
                        {isMovieFavorite ? 'favorite' : 'favorite_border'}
                    </span>
                    {isMovieFavorite ? 'В избранном' : 'В избранное'}
                </button>
            </div>

            {/* Some details */}
            <div className="flex-grow">
                <h3 className="text-3xl font-bold text-white">{movie.title}</h3>
                <p className="text-sm text-[#A6A4B0] mt-2">
                    {movie.year ? `${movie.year} год` : ''}{movie.year && (movie.duration || movie.genres.length > 0) ? ' • ' : ''}
                    {movie.duration ? `${movie.duration} минут` : ''}{movie.duration && movie.genres.length > 0 ? ' • ' : ''}
                    {movie.genres.join(' • ')}
                </p>
                <p className="mt-4 text-gray-300 text-base leading-relaxed">
                    {movie.description}
                </p>

                {/* additional information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-6 pt-4 border-t border-[#2D2A4A]">
                    {movie.details.country && (<InfoDetail label="Страна" value={movie.details.country}/>)}
                    {movie.details.director && (<InfoDetail label="Режиссер" value={movie.details.director}/>)}
                    {movie.details.budget && (<InfoDetail label="Бюджет" value={movie.details.budget}/>)}
                </div>

                {/* Buttons "Трейлер" and "Описание" */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <ActionButton
                        icon="play_circle"
                        text="Смотреть трейлер"
                        onClick={() => handleToggle('trailer')}
                        isActive={isTrailerOpen}
                    />
                    {(authorNote || isOwner) && (
                        <ActionButton
                            icon="description"
                            text="Описание автора"
                            onClick={() => handleToggle('author')}
                            isActive={isAuthorNoteOpen}
                        />
                    )}
                </div>

                {/* Expanding content */}
                <div className="mt-6">
                    {/* Trailer */}
                    {isTrailerOpen && (
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full rounded-lg border-2 border-[#2D2A4A]"
                                src={movie.trailerUrl}
                                title={`${movie.title} Trailer`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {/* Author's description */}
                    {(isAuthorNoteOpen) && (
                        <div className="bg-black/20 border border-[#2D2A4A] pb-6 pl-6 pt-2 rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                                {/* Edit button only for owner */}
                                {isOwner && (
                                    <button
                                        onClick={onEditClick}
                                        className="text-[#5B7FFF] hover:text-white transition-colors"
                                        title="Редактировать заметку"
                                    >
                                        <span className="material-symbols-outlined text-xl">edit</span>
                                    </button>
                                )}
                            </div>

                            {/* Author`s text */}
                            {authorNote ? (
                                <p className="text-[#A6A4B0] italic leading-relaxed whitespace-pre-wrap">{authorNote}</p>
                            ) : (
                                <p className="text-gray-500 italic">
                                    {isOwner ? "Нажмите на карандаш, чтобы добавить заметку." : "Автор не оставил заметки к этому фильму."}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


function ActionButton({icon, text, onClick, isActive}) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all ${
                isActive
                    ? 'bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white shadow-lg shadow-purple-500/30' // Активный
                    : 'bg-[#1a162c] text-[#A6A4B0] border border-[#2D2A4A] hover:bg-[#2D2A4A] hover:text-white' // Неактивный
            }`}
        >
            <span className="material-symbols-outlined text-xl">{icon}</span>
            {text}
        </button>
    );
}


function InfoDetail({label, value}) {
    return (
        <div className="text-gray-300">
            <span className="font-semibold text-gray-200">{label}:</span>
            <span className="ml-2 text-[#A6A4B0]">{value}</span>
        </div>
    );
}
