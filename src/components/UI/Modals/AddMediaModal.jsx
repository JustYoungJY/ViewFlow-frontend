import { useState, useRef } from 'react';
import instance from '../../../api/axiosInstance';
import SearchResultsDropdown from "../Search/SearchResultsDropdown.jsx";


export default function AddMediaModal({ isOpen, onClose, compilationId, currentCount, onSuccess }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const debounceTimer = useRef(null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    if (!isOpen) return null;

    const performSearch = async (query) => {
        if (query.length < 3) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const response = await instance.get(`/media/selection?query=${encodeURIComponent(query)}`);
            setSearchResults(response.data || []);
        } catch {
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => performSearch(query), 500);
    };

    const handleAdd = async (media) => {
        setIsAdding(true);
        try {
            await instance.post(`/compilations/${compilationId}/media`, {
                mediaId: media.mediaId,
                mediaType: media.mediaType,
                orderIndex: currentCount,
                authorDescription: ''
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Ошибка добавления:", error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleSelectMedia = (media) => {
        handleAdd(media);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-xl bg-[#1a162c] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-110">

                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Добавить фильм</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined">search</span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Название фильма или сериала..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            autoFocus
                            className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#0F0A1F] text-white border border-transparent focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF] outline-none"
                        />
                        {isSearching && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="animate-spin h-5 w-5 border-2 border-[#5B7FFF] border-t-transparent rounded-full"></div>
                            </div>
                        )}


                        <div className="mt-5">
                        {searchQuery.length >= 3 && !isSearching && searchResults.length > 0 && (
                            <SearchResultsDropdown
                                searchResults={searchResults}
                                dropdownRef={dropdownRef}
                                handleSelectMedia={handleSelectMedia}
                            />
                        )}
                        </div>

                        {searchQuery.length >= 3 && !isSearching && searchResults.length === 0 && (
                            <div className="absolute z-10 mt-1 w-full bg-[#1a162c] border border-white/10 rounded-lg shadow-lg p-4 text-center text-gray-500">
                                Ничего не найдено
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}