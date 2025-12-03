import { useState, useEffect } from 'react';
import instance from '../../../api/axiosInstance';

export default function EditMediaModal({ isOpen, onClose, mediaItem, compilationId, onSuccess }) {
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (mediaItem) {
            setDescription(mediaItem.authorDescription || '');
        }
    }, [mediaItem]);

    if (!isOpen || !mediaItem) return null;

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await instance.patch(`/compilations/${compilationId}/media`, {
                mediaId: mediaItem.mediaId,
                mediaType: mediaItem.mediaType,
                authorDescription: description
            });
            onSuccess();
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Удалить этот фильм из подборки?")) return;

        setIsLoading(true);
        try {
            await instance.delete(`/compilations/${compilationId}/media`, {
                params: {
                    mediaId: mediaItem.mediaId,
                    mediaType: mediaItem.mediaType
                }
            });
            onSuccess();
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-[#1a162c] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                        Редактировать заметку
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Information about media */}
                <div className="p-6 flex items-center gap-4 bg-[#151124]">
                    <img
                        src={mediaItem.mediaDetails.posterUrl || `https://image.tmdb.org/t/p/w92${mediaItem.mediaDetails.posterPath}`}
                        alt={mediaItem.mediaDetails.title}
                        className="w-16 h-24 object-cover rounded-md shadow-lg"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-bold truncate text-xl">{mediaItem.mediaDetails.title}</p>
                        <p className="text-gray-400 text-sm">
                            {mediaItem.mediaDetails.mediaType === 'MOVIE' ? 'Фильм' : 'Сериал'} • {mediaItem.mediaDetails.releaseYear ? `${mediaItem.mediaDetails.releaseYear} год` : ''}
                        </p>
                    </div>
                </div>

                {/* Main content */}
                <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                    <label htmlFor="authorDescription" className="block text-gray-300 font-medium mb-2">
                        Ваша заметка к этому фильму:
                    </label>
                    <textarea
                        id="authorDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="w-full p-4 rounded-xl bg-[#0F0A1F] text-white border border-transparent focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF] outline-none resize-none placeholder:text-gray-600 custom-scrollbar"
                        placeholder="Почему этот фильм здесь? (Необязательно)"
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-2">Максимум 500 символов.</p>
                </div>

                {/* Buttons save/delete */}
                <div className="p-6 border-t border-white/10 flex justify-between items-center bg-[#151124] flex-shrink-0">
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">delete</span>
                        <span className="text-sm font-medium">Удалить фильм</span>
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white font-medium hover:opacity-90 disabled:opacity-50"
                    >
                        {isLoading ? 'Сохранение...' : 'Сохранить заметку'}
                    </button>
                </div>
            </div>
        </div>
    );
}
