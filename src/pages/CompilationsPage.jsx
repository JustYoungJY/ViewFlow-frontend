import {useMemo, useState, useEffect} from 'react';
import CompilationCard from '../components/UI/Cards/CompilationCard.jsx';
import CompilationSort from '../components/UI/Filter/CompilationSort.jsx';
import SelectedFilters from '../components/UI/Filter/SelectedFilters.jsx';
import instance from "../api/axiosInstance.js";
import CreateCompilationModal from "../components/Content/CreateCompilationModal.jsx";


const predefinedHeights = [
    '400px', '500px', '450px', '550px', '420px', '580px', '480px', '520px', '460px', '600px'
];

export default function CompilationsPage() {
    const [compilations, setCompilations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [titleSearchQuery, setTitleSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);

    const [sortBy, setSortBy] = useState("likesCount");
    const [sortDirection, setSortDirection] = useState("desc");

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const fetchCompilations = async () => {
        setIsLoading(true);
        try {
            let sortField = sortBy;
            if (sortBy === 'popularity') sortField = 'likesCount';
            if (sortBy === 'newest') sortField = 'createdAt';
            if (sortBy === 'movieCount') sortField = 'mediaCount';
            if (sortBy === 'likes') sortField = 'likesCount';

            const params = new URLSearchParams({
                page: 0,
                size: 20,
                sort: `${sortField},${sortDirection}`
            });

            if (titleSearchQuery) {
                params.append('titleFilter', titleSearchQuery);
            }

            selectedFilters.forEach(tag => {
                params.append('tags', tag.name);
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
                tags: item.tags || [],
                height: predefinedHeights[item.id % predefinedHeights.length]
            }));

            setCompilations(adaptedData);
        } catch (error) {
            console.error("Ошибка загрузки подборок:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchCompilations();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [selectedFilters, sortBy, sortDirection, titleSearchQuery]);



    const handleTagClick = (tag) => {
        if (!selectedFilters.some(f => f.id === tag.id)) {
            setSelectedFilters([...selectedFilters, tag]);
        }
    };


    const handleRemoveFilter = (filterNameToRemove) => {
        setSelectedFilters(selectedFilters.filter(f => f.name !== filterNameToRemove));
    }


    const columns = useMemo(() => {
        if (!compilations || compilations.length === 0) return [[], [], [], []];

        const numColumns = 4;
        const columnArrays = Array.from({ length: numColumns }, () => []);

        compilations.forEach((item, index) => {
            const height = predefinedHeights[index % predefinedHeights.length];
            columnArrays[index % numColumns].push({...item, height});
        });

        return columnArrays;
    }, [compilations]);


    return (
        <div className="min-h-screen bg-[#0F0A1F] text-[#9CA3AF] px-6 py-8">
            <div className="max-w-screen-2xl mx-auto">

                <header className="mb-8 space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-12">
                        Подборки
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="relative flex-grow">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8d9bce] text-2xl">
                                search
                            </span>
                            <input
                                type="text"
                                value={titleSearchQuery}
                                onChange={(e) => setTitleSearchQuery(e.target.value)}
                                placeholder="Поиск по названию..."
                                className="w-full h-12 pl-12 pr-12 rounded-full text-white bg-[#1a162c] border-none focus:outline-0 focus:ring-2 focus:ring-[#5c7fff]/50"
                            />
                        </div>
                        <button onClick={() => setCreateModalOpen(true)}
                            className="flex-shrink-0 flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-[#5B7FFF] to-[#A259FF] text-white transition-transform duration-300 hover:scale-110">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 min-h-[2.5rem]">
                        <CompilationSort
                            sortBy={sortBy}
                            onSortByChange={setSortBy}
                            sortDirection={sortDirection}
                            onSortDirectionChange={setSortDirection}
                        />

                        <SelectedFilters
                            filters={selectedFilters.map(f => f.name)}
                            onRemove={handleRemoveFilter}
                        />
                    </div>
                </header>

                <main>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64 text-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B7FFF]"></div>
                        </div>
                    ) : compilations.length === 0 ? (
                        <div className="text-center text-xl text-gray-500 mt-10">
                            Подборки не найдены
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {columns.map((column, colIndex) => (
                                <div key={colIndex} className="flex flex-col gap-6">
                                    {column.map(collection => (
                                        <CompilationCard
                                            key={collection.id}
                                            collection={collection}
                                            onTagClick={handleTagClick}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <CreateCompilationModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSuccess={fetchCompilations}
            />
        </div>
    );
}