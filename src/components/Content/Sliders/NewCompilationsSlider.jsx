import { useState, useEffect } from 'react';
import CompilationCard from '../../UI/Cards/CompilationCard.jsx';
import instance from '../../../api/axiosInstance.js';

export default function NewCompilationsSlider() {
    const [compilations, setCompilations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNewCompilations = async () => {
        setIsLoading(true);
        try {
            // Sort by createdAt in descending order to get newest compilations
            const params = new URLSearchParams({
                page: 0,
                size: 10,
                sort: 'createdAt,desc'
            });

            const response = await instance.get(`/compilations?${params.toString()}`);

            const adaptedData = response.data.content.map(item => ({
                id: item.id,
                title: item.title,
                imageUrl: item.imageUrl || "https://via.placeholder.com/400x600",
                user: {
                    username: item.viewerUsername,
                    avatarUrl: item.viewerAvatarUrl || "https://via.placeholder.com/150"
                },
                movieCount: item.mediaCount,
                likes: item.likesCount,
                tags: item.tags || []
            }));

            setCompilations(adaptedData);
        } catch (error) {
            console.error("Ошибка загрузки новых подборок:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNewCompilations();
    }, []);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B7FFF]"></div>
            </div>
        );
    }

    if (compilations.length === 0) {
        return (
            <div className="text-center text-xl text-gray-500 mt-10">
                Подборки не найдены
            </div>
        );
    }

    return (
        <div className="flex overflow-x-scroll space-x-4 pb-4 px-1 pt-4 custom-scrollbar">
            {compilations.map(compilation => (
                <div key={compilation.id} className="min-w-[300px] max-w-[300px]">
                    <CompilationCard
                        collection={compilation}
                    />
                </div>
            ))}
        </div>
    );
}