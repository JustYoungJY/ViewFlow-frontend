import { useState, useEffect } from 'react';
import instance from '../../../api/axiosInstance';
import { useToast } from '../../../context/ToastContext';

export default function EditCompilationModal({ isOpen, onClose, compilation, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        isPublic: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoadingTags, setIsLoadingTags] = useState(false);
    const [tagSearchQuery, setTagSearchQuery] = useState('');
    const [filteredTags, setFilteredTags] = useState([]);


    const fetchTags = async () => {
        setIsLoadingTags(true);
        try {
            const response = await instance.get('/tags');
            setAvailableTags(response.data.content || []);
            setFilteredTags(response.data.content || []);
        } catch (error) {
            console.error('Error fetching tags:', error);
            showToast('Не удалось загрузить теги', 'error');
        } finally {
            setIsLoadingTags(false);
        }
    };

    useEffect(() => {
        if (tagSearchQuery.trim() === '') {
            setFilteredTags(availableTags);
        } else {
            const filtered = availableTags.filter(tag => 
                tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase())
            );
            setFilteredTags(filtered);
        }
    }, [tagSearchQuery, availableTags]);

    useEffect(() => {
        if (isOpen) {
            fetchTags();
            setTagSearchQuery('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (compilation) {
            setFormData({
                title: compilation.title || '',
                description: compilation.description || '',
                isPublic: compilation.isPublic ?? true
            });

            if (compilation.tags && Array.isArray(compilation.tags)) {
                const validTags = compilation.tags.filter(tag => tag && tag.id);
                setSelectedTags(validTags);
            } else {
                setSelectedTags([]);
            }
        }
    }, [compilation]);

    if (!isOpen) return null;

    const handleAddTag = (tag) => {
        if (selectedTags.length >= 5) {
            showToast('Можно выбрать максимум 5 тегов', 'warning');
            return;
        }

        if (!selectedTags.some(t => t.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleRemoveTag = (tagId) => {
        setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await instance.put(`/compilations/${compilation.id}`, formData);

            const originalTags = (compilation.tags || []).filter(tag => tag && tag.id);

            const tagsToRemove = originalTags.filter(
                origTag => !selectedTags.some(selTag => selTag.id === origTag.id)
            );

            const tagsToAdd = selectedTags.filter(
                selTag => !originalTags.some(origTag => origTag.id === selTag.id)
            );

            const tagPromises = [];

            tagsToRemove.forEach(tag => {
                tagPromises.push(instance.delete(`/tags/compilations/${compilation.id}/${tag.id}`));
            });

            tagsToAdd.forEach(tag => {
                tagPromises.push(instance.post(`/tags/compilations/${compilation.id}`, null, {
                    params: { tagId: tag.id }
                }));
            });

            if (tagPromises.length > 0) {
                await Promise.all(tagPromises);
            }

            onSuccess();
            onClose();

        } catch (error) {
            console.error('Error updating compilation:', error);
            showToast('Не удалось сохранить изменения', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-[#1a162c] rounded-2xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Настройки подборки</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">Название</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full h-12 px-4 rounded-xl bg-[#0F0A1F] text-white border border-transparent focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF] outline-none"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-300">Описание</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows={4}
                            className="w-full p-4 rounded-xl bg-[#0F0A1F] text-white border border-transparent focus:border-[#5B7FFF] focus:ring-1 focus:ring-[#5B7FFF] outline-none resize-none"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isPublicEdit"
                            checked={formData.isPublic}
                            onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                            className="w-5 h-5 accent-[#5B7FFF]"
                        />
                        <label htmlFor="isPublicEdit" className="text-gray-300 cursor-pointer">Публичная подборка</label>
                    </div>

                    {/* Tags Section */}
                    <div className="space-y-3 mt-6">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-300">Теги (максимум 5)</label>
                            <span className="text-xs text-gray-500">{selectedTags.length}/5</span>
                        </div>

                        {/* Selected Tags */}
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {selectedTags.map(tag => (
                                    <div 
                                        key={tag.id} 
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B7FFF]/20 border border-[#5B7FFF]/30 text-white text-xs"
                                    >
                                        <span>{tag.name}</span>
                                        <button
                                            onClick={() => handleRemoveTag(tag.id)}
                                            className="p-0.5 hover:bg-[#5B7FFF]/20 rounded-full transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tag Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Поиск тегов..."
                                value={tagSearchQuery}
                                onChange={(e) => setTagSearchQuery(e.target.value)}
                                className="w-full h-10 px-3 rounded-lg bg-[#0F0A1F] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#5B7FFF]"
                            />
                            {isLoadingTags && (
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full inline-block"></span>
                                </span>
                            )}
                        </div>

                        {/* Available Tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {filteredTags.map(tag => (
                                <button
                                    key={tag.id}
                                    onClick={() => handleAddTag(tag)}
                                    disabled={selectedTags.some(t => t.id === tag.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                        selectedTags.some(t => t.id === tag.id)
                                            ? 'bg-[#5B7FFF]/50 text-white cursor-default'
                                            : 'bg-[#4B5563] text-[#E5E7EB] hover:bg-[#5B7FFF] cursor-pointer'
                                    }`}
                                >
                                    {tag.name}
                                </button>
                            ))}
                            {filteredTags.length === 0 && !isLoadingTags && (
                                <div className="w-full text-center text-gray-500 text-sm py-2">
                                    Теги не найдены
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-300 hover:bg-white/5 transition-colors">Отмена</button>
                        <button type="submit" disabled={isLoading} className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white font-medium hover:opacity-90 transition-opacity">
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
