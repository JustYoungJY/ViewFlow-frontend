import CatalogCarousel from "../components/Content/Carousel/CatalogCarousel.jsx";
import {useEffect, useState} from "react";
import SortSelector from "../components/UI/Filter/SortSelector.jsx";
import MovieGrid from "../components/Content/Grids/MovieGrid.jsx";
import FilterPanel from "../components/UI/Filter/FilterPanel.jsx";
import HorizontalRow from "../components/Content/Sliders/HorizontalRow.jsx";
import instance from "../api/axiosInstance.js";

export default function CatalogPage() {
    const [movies, setMovies] = useState([]);
    const [availableGenres, setAvailableGenres] = useState([]);
    const [availableCountries, setAvailableCountries] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [filters, setFilters] = useState({
        mediaType: 'MOVIE',
        genreId: null,
        countryId: null,
        yearFrom: 1950,
        yearTo: 2025,
        ratingFrom: 0,
        ratingTo: 10,
    });

    const [sortConfig, setSortConfig] = useState({
        order: 'RATING',
        direction: 'desc'
    });

    // Loading Genres and Countries
    useEffect(() => {
        const fetchDictionaries = async () => {
            try {
                const [genresRes, countriesRes] = await Promise.all([
                    instance.get('/media/genres'),
                    instance.get('/media/countries')
                ]);
                setAvailableGenres(genresRes.data);
                setAvailableCountries(countriesRes.data);
            } catch (error) {
                console.error("Ошибка загрузки справочников:", error);
            }
        };
        fetchDictionaries();
    }, []);


    useEffect(() => {
        fetchMovies();
    }, [filters, sortConfig, currentPage]);


    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: currentPage,
                size: 20,
                countryId: filters.countryId,
                genreId: filters.genreId,
                mediaType: filters.mediaType,
                order: sortConfig.order,
                ratingFrom: filters.ratingFrom,
                ratingTo: filters.ratingTo,
                yearFrom: filters.yearFrom,
                yearTo: filters.yearTo,
            };


            Object.keys(params).forEach(key => {
                if (params[key] === null || params[key] === undefined || params[key] === '') {
                    delete params[key];
                }
            });

            const response = await instance.get('/media/filtered', { params });

            let items = response.data.content;
            setMovies(items || []);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            console.error("Ошибка загрузки фильмов:", error);
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };


    const handleFilterApply = (newFilters) => {
        setFilters(prev => ({...prev, ...newFilters}));
        setCurrentPage(0);
    };

    const handleSortChange = (key, direction) => {
        setSortConfig({order: key, direction});
        setCurrentPage(0);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="bg-[#191825] min-h-screen pb-12">
            <CatalogCarousel />

            <h2 className="text-3xl font-bold text-white px-8 pt-20 pl-22 pb-3 max-w-7xl mx-auto">
                Каталог медиа
            </h2>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filter panel */}
                    <FilterPanel
                        onApply={handleFilterApply}
                        genres={availableGenres}
                        countries={availableCountries}
                    />

                    <div className="flex-grow min-w-0">
                        {/* Sorting */}
                        <SortSelector
                            sortBy={sortConfig.order}
                            onSortChange={handleSortChange}
                        />

                        {/* Grid */}
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B7FFF]"></div>
                            </div>
                        ) : (
                            <MovieGrid
                                movies={movies}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>

                {/* Sliders */}
                <div className="mt-20 space-y-12">
                    {/*TODO: add HorizontalRow
                    <HorizontalRow title="Топ 10 фильмов недели" movies={topWeek} />
                    */}
                </div>
            </div>
        </div>
    )
}