import { useState } from 'react';

import MovieCard from '../components/UI/Cards/MovieCard.jsx';
import CompilationCard from '../components/UI/Cards/CompilationCard.jsx';
import ExpandableGrid from "../components/Content/Grids/ExpandableGrid.jsx";
import ProfileHeader from "../components/Content/Headers/ProfileHeader.jsx";
import ProfileTabs from "../components/UI/Tabs/ProfileTabs.jsx";
import {useParams} from "react-router-dom";


// Dummy data
const dummyStats = {
    likes: 342,
    compilations: 12,
    watched: 1876
};

const favoriteCompilations = Array.from({ length: 5 }, (_, i) => ({
    id: i + 100,
    title: `Избранная подборка #${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${i}b/400/600`,
    user: { username: 'other_user', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    movieCount: i + 10,
    likes: i * 15,
    tags: ["#Избранное"],
}));


const favoriteMovies = Array.from({ length: 12 }, (_, i) => ({
    id: i + 200,
    title: `Избранный фильм #${i + 1}`,
    posterUrl: `https://picsum.photos/seed/${i}c/400/550`,
    year: 2020 + i,
    genre: 'Драма',
    rating: (8 - i * 0.1).toFixed(1),
}));


const watchedMovies = Array.from({ length: 20 }, (_, i) => ({
    id: i + 300,
    title: `Просмотренный фильм #${i + 1}`,
    posterUrl: `https://picsum.photos/seed/${i}d/400/520`,
    year: 2010 + i,
    genre: 'Фантастика',
    rating: (9 - i * 0.1).toFixed(1),
}));


const watchedSeries = Array.from({ length: 3 }, (_, i) => ({
    id: i + 400,
    title: `Просмотренный сериал #${i + 1}`,
    posterUrl: `https://picsum.photos/seed/${i}e/400/580`,
    year: 2022 + i,
    genre: 'Сериал',
    rating: (8.5 - i * 0.1).toFixed(1),
}));



export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('Мои подборки');
    const { username } = useParams();

    const dummyUser = {
        username: username,
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL6cZFENCgBxOVdy_lKfypHy594DLfS_2MPjZQfLPoQLUy9bCeEQj9TEc3cii8Cr4PGB7Vsq6j-L6US-iU2iMkH8o9VA4QSAPp6KfnJdL6PIZWaapvxR52BacGTKf1BNjDY95NvkpTCt0KZvJLTK_k1Q01er7NltwkahIPiH4pD6T8P0DJll02tQizfQAjRSZJ0Y_eQEyHMzpRR0uLaIJ8KZ4hr79w6-zgqLBIbEf3MfWPeU6g64i6cRed87axdXcfAoagX3I9YjO3'
    };

    const myCompilations = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Моя подборка #${i + 1}`,
        imageUrl: `https://picsum.photos/seed/${i}a/400/500`,
        user: username,
        movieCount: i + 5,
        likes: i * 10,
        tags: ["#Мое", "#Топ"],
    }));

    // Function for rendering content depending on the tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Мои подборки':
                return (
                    <ExpandableGrid
                        items={myCompilations}
                        renderItem={(item) => <CompilationCard collection={item} onTagClick={() => {}} />}
                        initialLimit={4}
                        incrementBy={4}
                    />
                );

            case 'Избранное':
                return (
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Избранные подборки</h2>
                            <ExpandableGrid
                                items={favoriteCompilations}
                                renderItem={(item) => <CompilationCard collection={item} onTagClick={() => {}} />}
                                initialLimit={4}
                                incrementBy={4}
                            />
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Избранные фильмы и сериалы</h2>
                            <ExpandableGrid
                                items={favoriteMovies}
                                renderItem={(item) => <MovieCard movie={item} />}
                                initialLimit={8}
                                incrementBy={8}
                            />
                        </section>
                    </div>
                );

            case 'Просмотренное':
                return (
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Фильмы</h2>
                            <ExpandableGrid
                                items={watchedMovies}
                                renderItem={(item) => <MovieCard movie={item} />}
                                initialLimit={8}
                                incrementBy={8}
                            />
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Сериалы</h2>
                            <ExpandableGrid
                                items={watchedSeries}
                                renderItem={(item) => <MovieCard movie={item} />}
                                initialLimit={4}
                                incrementBy={4}
                            />
                        </section>
                    </div>
                );

            case 'Активность':
                return (
                    <div className="text-center text-[#A6A4B0] py-16">
                        <p>Раздел "Активность" находится в разработке.</p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0A1F] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <ProfileHeader user={dummyUser} stats={dummyStats} />

                {/* Tabs */}
                <ProfileTabs activeTab={activeTab} onTabClick={setActiveTab} />

                {/* Tabs content */}
                <div className="mt-8">
                    {renderTabContent()}
                </div>

            </div>
        </div>
    );
}