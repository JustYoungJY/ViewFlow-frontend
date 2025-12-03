import { useState, useEffect } from 'react';
import instance from '../../../api/axiosInstance';

export default function EditCompilationModal({ isOpen, onClose, compilation, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        isPublic: true
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (compilation) {
            setFormData({
                title: compilation.title || '',
                description: compilation.description || '',
                isPublic: compilation.isPublic ?? true
            });
        }
    }, [compilation]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await instance.put(`/compilations/${compilation.id}`, formData);
            onSuccess();
            onClose();
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
