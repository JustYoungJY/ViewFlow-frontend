import CatalogCarousel from "../components/Content/Carousel/CatalogCarousel.jsx";
import {useEffect, useState} from "react";
import SortSelector from "../components/UI/Filter/SortSelector.jsx";
import MovieGrid from "../components/Content/Grids/MovieGrid.jsx";
import FilterPanel from "../components/UI/Filter/FilterPanel.jsx";
import HorizontalRow from "../components/Content/Sliders/HorizontalRow.jsx";


export default function CatalogPage() {
    const catalogMovies = [
        {
            id: 1,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "fantastic",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
        {
            id: 2,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "fantastic",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
        {
            id: 3,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "fantastic",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
        {
            id: 4,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "fantastic",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
        {
            id: 5,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "fantastic",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
        {
            id: 6,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "fantastic",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
        {
            id: 7,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "fantastic",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
        {
            id: 8,
            title: "Матрица",
            posterUrl: "https://cdn.ananasposter.ru/image/cache/catalog/poster/film/95/2777-1000x830.jpg",
            year: 1999,
            genre: "drama",
            rating: 8.7,
            country: "USA",
            language: "English",
            platforms: ["Netflix"],
            popularity: 95,
            type: "movie",
        },
    ];


    const topWeek = [
        {
            id: 1,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            genre: "fantastic",
            rating: 8.6,
        },
        {
            id: 2,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            genre: "fantastic",
            rating: 8.6,
        },
        {
            id: 3,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            genre: "fantastic",
            rating: 8.6,
        },
        {
            id: 4,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            genre: "fantastic",
            rating: 8.6,
        },
        {
            id: 5,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            genre: "fantastic",
            rating: 8.6,
        },
        {
            id: 6,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            genre: "fantastic",
            rating: 8.6,
        },
        {
            id: 7,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            genre: "fantastic",
            rating: 8.6,
        }
    ];

    const newReleases = [
        {
            id: 1,
            title: "Оппенгеймер",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900",
            year: 2023,
            genre: "drama",
            rating: 8.4,
        },
        {
            id: 2,
            title: "Оппенгеймер",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900",
            year: 2023,
            genre: "drama",
            rating: 8.4,
        },
        {
            id: 3,
            title: "Оппенгеймер",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900",
            year: 2023,
            genre: "drama",
            rating: 8.4,
        },
        {
            id: 4,
            title: "Оппенгеймер",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900",
            year: 2023,
            genre: "drama",
            rating: 8.4,
        }
    ];



    const [filteredMovies, setFilteredMovies] = useState(catalogMovies);
    const [sortBy, setSortBy] = useState('rating');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filters, setFilters] = useState({
        type: 'any',
        genre: '',
        minYear: 1950,
        maxYear: 2025,
        minRating: 0,
        maxRating: 10,
        country: '',
        language: '',
        platform: '',
    });

    useEffect(() => {
        let movies = [...catalogMovies];

        if (filters.type !== 'any') {
            movies = movies.filter(movie => movie.type === filters.type);
        }

        if (filters.genre) {
            movies = movies.filter(movie => movie.genre === filters.genre);
        }

        movies = movies.filter(movie => movie.year >= filters.minYear && movie.year <= filters.maxYear);
        movies = movies.filter(movie => movie.rating >= filters.minRating && movie.rating <= filters.maxRating);

        if (filters.country) {
            movies = movies.filter(movie => movie.country === filters.country);
        }

        if (filters.language) {
            movies = movies.filter(movie => movie.language === filters.language);
        }

        if (filters.platform) {
            movies = movies.filter(movie => movie.platforms.includes(filters.platform));
        }

        const compare = (a, b) => {
            let valA, valB;

            switch (sortBy) {
                case 'rating':
                    valA = a.rating; valB = b.rating; break;
                case 'year':
                    valA = a.year; valB = b.year; break;
                case 'title':
                    valA = a.title.toLowerCase(); valB = b.title.toLowerCase(); break;
                case 'popularity':
                    valA = a.popularity; valB = b.popularity; break;
                default:
                    return 0;
            }

            if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        };

        movies.sort(compare);

        setFilteredMovies(movies);
    }, [filters, sortBy]);

    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="bg-[#191825] min-h-screen pb-12"> {/* Добавлено bg-color и pb-12 */}
            <CatalogCarousel />

            <h2 className="text-3xl font-bold text-white px-8 pt-20 pl-22 pb-3">Каталог фильмов</h2>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    <FilterPanel onApply={handleFilterApply} />

                    <div className="flex-grow">
                        <SortSelector sortBy={sortBy} onChange={setSortBy} />

                        <MovieGrid movies={filteredMovies} />
                    </div>
                </div>

                <div className="mt-25 space-y-12">
                    <HorizontalRow title="Топ 10 фильмов недели" movies={topWeek} />
                    <HorizontalRow title="Новинки этого месяца" movies={newReleases} />
                </div>
            </div>
        </div>
    )
}