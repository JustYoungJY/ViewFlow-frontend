import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import MovieCard from '../components/UI/Cards/MovieCard.jsx';
import CompilationCard from '../components/UI/Cards/CompilationCard.jsx';
import WatchedMediaCard from '../components/UI/Cards/WatchedMediaCard.jsx';
import ExpandableGrid from "../components/Content/Grids/ExpandableGrid.jsx";
import ProfileHeader from "../components/Content/Headers/ProfileHeader.jsx";
import ProfileTabs from "../components/UI/Tabs/ProfileTabs.jsx";

import instance from "../api/axiosInstance.js";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('Мои подборки');
    const { username } = useParams();

    // State for user profile data
    const [userData, setUserData] = useState({
        username: username || 'User',
        avatarUrl: '',
        email: '',
        bio: '',
        createdAt: '',
        likesCount: 0,
        compilationsCount: 0,
        filmsWatched: 0
    });

    const [myCompilations, setMyCompilations] = useState([]);
    const [favoriteMedia, setFavoriteMedia] = useState([]);
    const [watchedMedia, setWatchedMedia] = useState([]);

    const [isLoading, setIsLoading] = useState({
        user: true,
        compilations: true,
        favorites: true,
        watched: true
    });
    const [error, setError] = useState({
        user: null,
        compilations: null,
        favorites: null,
        watched: null
    });



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await instance.get('/user/me');
                setUserData(response.data);
                setIsLoading(prev => ({ ...prev, user: false }));
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(prev => ({ ...prev, user: 'Failed to load user data' }));
                setIsLoading(prev => ({ ...prev, user: false }));
            }
        };
        fetchUserData();
    }, []);


    useEffect(() => {
        const fetchCompilations = async () => {
            try {
                const response = await instance.get('/compilations/user');
                const transformedCompilations = response.data.map(comp => ({
                    id: comp.id,
                    title: comp.title,
                    imageUrl: comp.imageUrl,
                    user: {
                        username: comp.viewerUsername,
                        avatarUrl: comp.viewerAvatarUrl
                    },
                    movieCount: comp.mediaCount,
                    likes: comp.likesCount,
                    tags: comp.tags || []
                }));
                setMyCompilations(transformedCompilations);
                setIsLoading(prev => ({ ...prev, compilations: false }));
            } catch (err) {
                console.error('Error fetching compilations:', err);
                setError(prev => ({ ...prev, compilations: 'Failed to load compilations' }));
                setIsLoading(prev => ({ ...prev, compilations: false }));
            }
        };
        fetchCompilations();
    }, []);



    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // Бэк возвращает Page, берем content
                const response = await instance.get('/favorites/media');
                setFavoriteMedia(response.data.content || []);
                setIsLoading(prev => ({ ...prev, favorites: false }));
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError(prev => ({ ...prev, favorites: 'Failed to load favorites' }));
                setIsLoading(prev => ({ ...prev, favorites: false }));
            }
        };
        fetchFavorites();
    }, []);


    useEffect(() => {
        const fetchWatched = async () => {
            try {
                // Бэк возвращает Page, берем content
                const response = await instance.get('/watched');
                setWatchedMedia(response.data.content || []);
                setIsLoading(prev => ({ ...prev, watched: false }));
            } catch (err) {
                console.error('Error fetching watched media:', err);
                setError(prev => ({ ...prev, watched: 'Failed to load watched media' }));
                setIsLoading(prev => ({ ...prev, watched: false }));
            }
        };
        fetchWatched();
    }, []);




    const renderLoadingOrError = (loadingState, errorState) => {
        if (loadingState) {
            return <div className="text-center py-16"><p className="text-[#A6A4B0]">Загрузка...</p></div>;
        }
        if (errorState) {
            return <div className="text-center py-16"><p className="text-red-500">{errorState}</p></div>;
        }
        return null;
    };



    const renderTabContent = () => {
        switch (activeTab) {
            case 'Мои подборки':
                if (isLoading.compilations) return renderLoadingOrError(true, null);
                if (error.compilations) return renderLoadingOrError(false, error.compilations);

                if (myCompilations.length === 0) {
                    return (
                        <div className="text-center py-16 text-[#A6A4B0] border-2 border-dashed border-[#2D2A4A] rounded-xl">
                            У вас пока нет подборок
                        </div>
                    );
                }

                return (
                    <ExpandableGrid
                        items={myCompilations}
                        renderItem={(item) => <CompilationCard collection={item} onTagClick={() => {}} />}
                        initialLimit={4}
                        incrementBy={4}
                    />
                );

            case 'Избранное': {
                if (isLoading.favorites) return renderLoadingOrError(true, null);
                if (error.favorites) return renderLoadingOrError(false, error.favorites);

                if (favoriteMedia.length === 0) {
                    return (
                        <div className="text-center py-16 text-[#A6A4B0] border-2 border-dashed border-[#2D2A4A] rounded-xl">
                            Список избранного пуст
                        </div>
                    );
                }


                const favMovies = favoriteMedia.filter(item => item.mediaType === 'MOVIE');
                const favShows = favoriteMedia.filter(item => item.mediaType === 'TV');


                const transformToCard = (item) => ({
                    mediaId: item.mediaId,
                    title: item.mediaDetails?.title || 'Без названия',
                    posterUrl: item.mediaDetails?.posterPath || '',
                    year: item.mediaDetails?.releaseYear || '',
                    genres: item.mediaDetails?.genres || [],
                    rating: item.mediaDetails?.voteAverage?.toFixed(1) || '0.0'
                });

                return (
                    <div className="space-y-12 animate-fade-in">
                        {/* Movie section */}
                        {favMovies.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-white">Фильмы</h2>
                                    <span className="bg-[#5B7FFF]/20 text-[#5B7FFF] px-2 py-0.5 rounded text-sm font-medium">
                                        {favMovies.length}
                                    </span>
                                </div>
                                <ExpandableGrid
                                    items={favMovies.map(transformToCard)}
                                    renderItem={(item) => <MovieCard movie={item} />}
                                    initialLimit={8}
                                    incrementBy={8}
                                />
                            </section>
                        )}

                        {/* Series section */}
                        {favShows.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-white">Сериалы</h2>
                                    <span className="bg-[#A259FF]/20 text-[#A259FF] px-2 py-0.5 rounded text-sm font-medium">
                                        {favShows.length}
                                    </span>
                                </div>
                                <ExpandableGrid
                                    items={favShows.map(transformToCard)}
                                    renderItem={(item) => <MovieCard movie={item} />}
                                    initialLimit={8}
                                    incrementBy={8}
                                />
                            </section>
                        )}
                    </div>
                );
            }

            case 'Просмотренное': {
                if (isLoading.watched) return renderLoadingOrError(true, null);
                if (error.watched) return renderLoadingOrError(false, error.watched);

                if (watchedMedia.length === 0) {
                    return (
                        <div className="text-center py-16 text-[#A6A4B0] border-2 border-dashed border-[#2D2A4A] rounded-xl">
                            У вас пока нет просмотренных медиа
                        </div>
                    );
                }


                const watchedMovies = watchedMedia.filter(item => item.mediaType === 'MOVIE');
                const watchedShows = watchedMedia.filter(item => item.mediaType === 'TV');

                return (
                    <div className="space-y-12 animate-fade-in">
                        {/* Movie section */}
                        {watchedMovies.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-white">Просмотренные фильмы</h2>
                                    <div className="h-px bg-white/10 flex-grow ml-4"></div>
                                </div>
                                <ExpandableGrid
                                    items={watchedMovies}
                                    // Используем новый компонент WatchedMediaCard
                                    renderItem={(item) => <WatchedMediaCard item={item} />}
                                    initialLimit={8}
                                    incrementBy={8}
                                />
                            </section>
                        )}

                        {/* Series section */}
                        {watchedShows.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-white">Просмотренные сериалы</h2>
                                    <div className="h-px bg-white/10 flex-grow ml-4"></div>
                                </div>
                                <ExpandableGrid
                                    items={watchedShows}
                                    // Используем новый компонент WatchedMediaCard
                                    renderItem={(item) => <WatchedMediaCard item={item} />}
                                    initialLimit={4}
                                    incrementBy={4}
                                />
                            </section>
                        )}
                    </div>
                );
            }

            case 'Активность':
                return (
                    <div className="text-center text-[#A6A4B0] py-16 bg-[#1a162c]/50 rounded-xl">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">construction</span>
                        <p>Раздел "Активность" находится в разработке.</p>
                    </div>
                );

            default:
                return null;
        }
    };

    // Header data
    const userStats = {
        likes: userData.likesCount || 0,
        compilations: userData.compilationsCount || 0,
        watched: userData.filmsWatched || 0
    };

    const userForHeader = {
        username: userData.username,
        avatarUrl: userData.avatarUrl || 'https://via.placeholder.com/150'
    };

    // Global loading/error for User Data
    if (isLoading.user) {
        return (
            <div className="min-h-screen bg-[#0F0A1F] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B7FFF]"></div>
            </div>
        );
    }

    if (error.user) {
        return (
            <div className="min-h-screen bg-[#0F0A1F] text-white flex items-center justify-center">
                <p className="text-red-500">{error.user}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0A1F] text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <ProfileHeader user={userForHeader} stats={userStats} />

                {/* Tabs */}
                <ProfileTabs activeTab={activeTab} onTabClick={setActiveTab} />

                {/* Tabs content */}
                <div className="mt-10">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}