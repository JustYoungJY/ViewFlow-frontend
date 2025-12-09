import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from "../components/UI/Cards/MovieCard.jsx";
import CompilationCard from "../components/UI/Cards/CompilationCard.jsx";
import instance from "../api/axiosInstance.js";


export default function CategoryPage() {
    const { categoryId } = useParams();

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [compilations, setCompilations] = useState([]);
    const [category, setCategory] = useState(null);

    const [visibleMovies, setVisibleMovies] = useState(10);
    const [visibleSeries, setVisibleSeries] = useState(10);
    const [visibleCompilations, setVisibleCompilations] = useState(6);


    useEffect(() => {
        const fetchCategory = async () => {

            const response = await instance.get(`categories/${categoryId}`);
            const data = response.data;

            setCategory(data);
        }

        fetchCategory();
    }, [])


    useEffect(() => {
        setVisibleMovies(10);
        setVisibleSeries(10);
        setVisibleCompilations(6);


        const mockMovies = Array.from({ length: 12 }).map((_, i) => ({
            mediaId: i,
            title: `Movie Title ${i + 1} (${categoryId})`,
            posterUrl: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", // Пример реального пути TMDB (Mario Bros)
            year: 2023,
            genres: ["Drama", "Action"],
            rating: (5 + Math.random() * 5).toFixed(1)
        }));


        const mockSeries = Array.from({ length: 8 }).map((_, i) => ({
            mediaId: 100 + i,
            title: `TV Show ${i + 1}`,
            posterUrl: "/u30fAnx9WdQrVsUAsrSDUnGp2Mh.jpg", // Пример пути TMDB
            year: 2022,
            genres: ["Drama", "Tv Show"],
            rating: (6 + Math.random() * 4).toFixed(1)
        }));


        const mockCompilations = Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            title: `Best of ${categoryId}`,
            imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
            height: "450px",
            user: { username: "Admin", avatarUrl: "https://i.pravatar.cc/150?u=admin" },
            movieCount: 15,
            likes: 42 + i,
            tags: [categoryId, "Atmospheric", "Classic"]
        }));

        setMovies(mockMovies);
        setSeries(mockSeries);
        setCompilations(mockCompilations);

    }, [categoryId]);

    const handleLoadMoreMovies = () => setVisibleMovies(prev => prev + 10);
    const handleLoadMoreSeries = () => setVisibleSeries(prev => prev + 10);
    const handleLoadMoreCompilations = () => setVisibleCompilations(prev => prev + 6);
    const handleTagClick = (tag) => console.log(`Tag clicked: ${tag}`);


    if (category === null) {
        return <div className="mt-10 text-[#A6A4B0]">Загрузка категорий...</div>;
    }

    return (
        <div className="min-h-screen bg-[#191825] pb-20">

            {/* --- HEADER SECTION --- */}
            <div className="relative bg-[#23213A] border-b border-[#2D2A4A] py-12 px-4 sm:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        {category.name}
                    </h1>
                    <p className="text-[#A6A4B0] text-lg max-w-2xl mx-auto leading-relaxed">
                        {category.description}
                    </p>
                </div>

                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#5B7FFF]/10 to-transparent pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 mt-12">

                {/* MOVIES SECTION */}
                {movies.length > 0 && (
                    <section>
                        <SectionHeader title="Фильмы" icon="movie" />

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {movies.slice(0, visibleMovies).map(movie => (
                                <MovieCard key={movie.mediaId} movie={movie} />
                            ))}
                        </div>

                        {visibleMovies < movies.length && (
                            <LoadMoreButton onClick={handleLoadMoreMovies} />
                        )}
                    </section>
                )}

                {/* SERIES */}
                {series.length > 0 && (
                    <section>
                        <SectionHeader title="Сериалы" icon="tv" />

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {series.slice(0, visibleSeries).map(show => (
                                <MovieCard key={show.mediaId} movie={show} />
                            ))}
                        </div>

                        {visibleSeries < series.length && (
                            <LoadMoreButton onClick={handleLoadMoreSeries} />
                        )}
                    </section>
                )}

                {/* COMPILATIONS SECTION */}
                {compilations.length > 0 && (
                    <section>
                        <SectionHeader title="Подборки" icon="collections_bookmark" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {compilations.slice(0, visibleCompilations).map(collection => (
                                <CompilationCard
                                    key={collection.id}
                                    collection={collection}
                                    onTagClick={handleTagClick}
                                />
                            ))}
                        </div>

                        {visibleCompilations < compilations.length && (
                            <LoadMoreButton onClick={handleLoadMoreCompilations} />
                        )}
                    </section>
                )}
            </div>
        </div>
    );
}



function SectionHeader({ title, icon }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-[#5B7FFF] text-3xl">{icon}</span>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="h-[1px] bg-[#2D2A4A] flex-grow ml-4"></div>
        </div>
    );
}

function LoadMoreButton({ onClick }) {
    return (
        <div className="flex justify-center mt-8">
            <button
                onClick={onClick}
                className="px-8 py-3 rounded-full border border-[#2D2A4A] text-[#E5E7EB]
                           bg-[#23213A] hover:bg-[#5B7FFF] hover:text-white hover:border-[#5B7FFF]
                           transition-all duration-300 font-medium text-sm flex items-center gap-2 group"
            >
                Смотреть больше
                <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform">
                    expand_more
                </span>
            </button>
        </div>
    );
}