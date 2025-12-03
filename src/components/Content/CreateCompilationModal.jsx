import { useState, useEffect, useRef } from 'react';
import SearchResultsDropdown from "../UI/Search/SearchResultsDropdown.jsx";
import instance from "../../api/axiosInstance.js";


export default function CreateCompilationModal({ isOpen, onClose, onSuccess }) {
    const initialFormData = {
        title: '',
        description: '',
        imageUrl: '',
        isPublic: true,
        mediaList: []
    };

    const [formData, setFormData] = useState(initialFormData);

    // Reset form data when modal is opened
    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormData);
            setSearchQuery('');
            setSearchResults([]);
            setShowDropdown(false);
        }
    }, [isOpen]);

    // Search functionality
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to search for media
    const searchMedia = async (query) => {
        if (!query || query.trim() === '') {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await instance.get(`/media/selection?query=${encodeURIComponent(query)}`);
            setSearchResults(response.data);
            setShowDropdown(true);
        } catch (err) {
            console.error('Error searching media:', err);
        } finally {
            setIsSearching(false);
        }
    };

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                searchMedia(searchQuery);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
                searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    // Handle selecting a media item from search results
    const handleSelectMedia = (media) => {
        const newMediaItem = {
            mediaId: media.mediaId,
            mediaType: media.mediaType,
            orderIndex: formData.mediaList.length,
            authorDescription: '',
            // Store additional info for display
            title: media.title,
            releaseYear: media.releaseYear,
            posterUrl: media.posterUrl
        };

        setFormData(prev => ({
            ...prev,
            mediaList: [...prev.mediaList, newMediaItem]
        }));

        setSearchQuery('');
        setShowDropdown(false);
    };

    const handleRemoveMedia = (index) => {
        setFormData(prev => ({
            ...prev,
            mediaList: prev.mediaList.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (formData.mediaList.length === 0) {
            setError('Подборка должна содержать хотя бы 1 фильм');
            setIsLoading(false);
            return;
        }

        try {
            await instance.post('/compilations', formData);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Не удалось создать подборку. Проверьте данные.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#1a162c] shadow-2xl transition-all flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white">Создание подборки</h2>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Название *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Например: Любимые комедии 90-х"
                            maxLength={64}
                            className="w-full h-12 px-4 rounded-xl bg-[#0F0A1F] text-white border border-transparent focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF] focus:outline-none transition-all placeholder:text-gray-600"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Описание *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="О чем эта подборка?"
                            maxLength={512}
                            rows={3}
                            className="w-full p-4 rounded-xl bg-[#0F0A1F] text-white border border-transparent focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF] focus:outline-none transition-all resize-none placeholder:text-gray-600 custom-scrollbar"
                            required
                        />
                    </div>

                    {/* Image URL & Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Обложка (URL) *</label>
                        <div className="flex gap-4 items-start">
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                placeholder="https://..."
                                className="flex-1 h-12 px-4 rounded-xl bg-[#0F0A1F] text-white border border-transparent focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF] focus:outline-none transition-all placeholder:text-gray-600"
                                required
                            />
                            <div className="w-20 h-12 shrink-0 rounded-lg bg-[#0F0A1F] overflow-hidden border border-white/5 flex items-center justify-center">
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined text-gray-600">image</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Visibility */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F0A1F] border border-white/5">
                        <input
                            type="checkbox"
                            name="isPublic"
                            id="isPublic"
                            checked={formData.isPublic}
                            onChange={handleInputChange}
                            className="w-5 h-5 rounded border-gray-600 bg-[#1a162c] text-[#5B7FFF] focus:ring-[#5B7FFF]"
                        />
                        <label htmlFor="isPublic" className="text-sm text-gray-300 select-none cursor-pointer flex-1">
                            Сделать подборку публичной
                        </label>
                        <span className="material-symbols-outlined text-gray-500">
                            {formData.isPublic ? 'public' : 'lock'}
                        </span>
                    </div>

                    {/* Media List Section (Simplified for DTO requirement) */}
                    <div className="space-y-3 pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-300">Состав подборки *</label>
                        </div>

                        {/* Search Media Input Group */}
                        <div className="relative">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Введите название фильма или сериала..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        ref={searchInputRef}
                                        className="w-full h-10 px-3 rounded-lg bg-[#0F0A1F] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5B7FFF]"
                                    />
                                    {isSearching && (
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full inline-block"></span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Search Results Dropdown */}
                            {showDropdown && searchResults.length > 0 && (
                                <SearchResultsDropdown
                                    searchResults={searchResults} 
                                    dropdownRef={dropdownRef} 
                                    handleSelectMedia={handleSelectMedia} 
                                />
                            )}
                        </div>

                        {/* List of added media */}
                        {formData.mediaList.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {formData.mediaList.map((item, idx) => (
                                    <div 
                                        key={idx} 
                                        className="flex items-center gap-2 p-2 rounded-lg bg-[#5B7FFF]/10 border border-[#5B7FFF]/20 text-white text-xs relative group"
                                    >
                                        {item.posterUrl ? (
                                            <img 
                                                src={`https://image.tmdb.org/t/p/w92${item.posterUrl}`} 
                                                alt={item.title || `Media ID: ${item.mediaId}`}
                                                className="w-8 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-8 h-12 bg-[#0F0A1F] rounded flex items-center justify-center">
                                                <span className="material-symbols-outlined text-gray-500 text-base">movie</span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white text-xs font-medium truncate">
                                                {item.title || `ID: ${item.mediaId}`}
                                            </div>
                                            <div className="text-gray-400 text-xs flex items-center gap-1">
                                                {item.releaseYear && <span>{item.releaseYear}</span>}
                                                <span>{item.mediaType === 'MOVIE' ? '🎬 Фильм' : '📺 Сериал'}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveMedia(idx)}
                                            className="p-1 hover:bg-[#5B7FFF]/20 rounded-full transition-colors absolute top-1 right-1 opacity-50 hover:opacity-100"
                                        >
                                            <span className="material-symbols-outlined text-base">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-[#1a162c]">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading && <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span>}
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
}
