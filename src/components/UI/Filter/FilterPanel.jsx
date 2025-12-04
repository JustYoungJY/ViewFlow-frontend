import {useState, useEffect, useRef} from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

export default function FilterPanel({onApply, genres = [], countries = []}) {
    const [localFilters, setLocalFilters] = useState({
        type: 'MOVIE',
        genreId: '',
        countryId: '',
        year: [1950, 2025],
        rating: [0, 10],
    });

    const [countrySearch, setCountrySearch] = useState('');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Closing the drop-down list when clicking out
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsCountryDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSliderChange = (name, values) => {
        setLocalFilters(prev => ({...prev, [name]: values}));
    };

    const handleChange = (e) => {
        setLocalFilters(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    // Selecting a country from the list
    const selectCountry = (country) => {
        setLocalFilters(prev => ({...prev, countryId: country.id}));
        setCountrySearch(country.country);
        setIsCountryDropdownOpen(false);
    };

    // Cleaning the country
    const clearCountry = () => {
        setLocalFilters(prev => ({...prev, countryId: ''}));
        setCountrySearch('');
    };

    const handleApply = () => {
        onApply({
            mediaType: localFilters.type,
            genreId: localFilters.genreId || null,
            countryId: localFilters.countryId || null,
            yearFrom: localFilters.year[0],
            yearTo: localFilters.year[1],
            ratingFrom: localFilters.rating[0],
            ratingTo: localFilters.rating[1],
        });
    };

    // Filtering the list of countries to search for
    const filteredCountries = countries.filter(c =>
        c.country.toLowerCase().includes(countrySearch.toLowerCase())
    );

    return (
        <div className="w-full lg:w-64 shrink-0 bg-[#191825] p-4 rounded-lg border border-[#2D2A4A] shadow-lg lg:sticky lg:top-24 self-start">
            <h3 className="text-xl font-bold text-white mb-4">Фильтры</h3>

            <div className="space-y-6">
                {/* Type of media */}
                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Тип</span>
                    <select name="type" value={localFilters.type} onChange={handleChange}
                            className="w-full mt-1 p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white focus:outline-none focus:border-[#5B7FFF]">
                        <option value="MOVIE">Фильм</option>
                        <option value="TV">Сериал</option>
                    </select>
                </label>

                {/* Genres */}
                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Жанр</span>
                    <select name="genreId" value={localFilters.genreId} onChange={handleChange}
                            className="w-full mt-1 p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white focus:outline-none focus:border-[#5B7FFF]">
                        <option value="">Любой</option>
                        {genres.map(g => (
                            <option key={g.id} value={g.id}>{g.genre}</option>
                        ))}
                    </select>
                </label>

                {/* Year */}
                <div className="block">
                    <div className="flex justify-between text-[#A6A4B0] text-sm mb-2">
                        <span>Год</span>
                        <span>{localFilters.year[0]} - {localFilters.year[1]}</span>
                    </div>
                    <Slider
                        range
                        min={1950}
                        max={2025}
                        value={localFilters.year}
                        onChange={(vals) => handleSliderChange('year', vals)}
                        trackStyle={[{backgroundColor: '#5B7FFF'}]}
                        handleStyle={[
                            {borderColor: '#5B7FFF', backgroundColor: '#121212'},
                            {borderColor: '#5B7FFF', backgroundColor: '#121212'}
                        ]}
                        railStyle={{backgroundColor: '#2D2A4A'}}
                    />
                </div>

                {/* Rating */}
                <div className="block">
                    <div className="flex justify-between text-[#A6A4B0] text-sm mb-2">
                        <span>Рейтинг</span>
                        <span>{localFilters.rating[0]} - {localFilters.rating[1]}</span>
                    </div>
                    <Slider
                        range
                        min={0}
                        max={10}
                        step={1}
                        value={localFilters.rating}
                        onChange={(vals) => handleSliderChange('rating', vals)}
                        trackStyle={[{backgroundColor: '#A259FF'}]}
                        handleStyle={[
                            {borderColor: '#A259FF', backgroundColor: '#121212'},
                            {borderColor: '#A259FF', backgroundColor: '#121212'}
                        ]}
                        railStyle={{backgroundColor: '#2D2A4A'}}
                    />
                </div>

                {/* Country */}
                <div className="block relative" ref={wrapperRef}>
                    <span className="text-[#A6A4B0] text-sm">Страна</span>
                    <div className="relative mt-1">
                        <input
                            type="text"
                            placeholder="Введите страну..."
                            value={countrySearch}
                            onChange={(e) => {
                                setCountrySearch(e.target.value);
                                setIsCountryDropdownOpen(true);
                                if (e.target.value === '') setLocalFilters(prev => ({...prev, countryId: ''}));
                            }}
                            onFocus={() => setIsCountryDropdownOpen(true)}
                            className="w-full p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white focus:outline-none focus:border-[#5B7FFF] pr-8"
                        />
                        {/* Clear button */}
                        {countrySearch && (
                            <button
                                onClick={clearCountry}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Drop-down list */}
                    {isCountryDropdownOpen && filteredCountries.length > 0 && (
                        <ul className="absolute z-50 w-full max-h-48 overflow-y-auto bg-[#1a162c] border border-[#2D2A4A] rounded mt-1 shadow-xl">
                            {filteredCountries.map(c => (
                                <li
                                    key={c.id}
                                    onClick={() => selectCountry(c)}
                                    className="px-3 py-2 text-sm text-gray-300 hover:bg-[#5B7FFF] hover:text-white cursor-pointer transition-colors"
                                >
                                    {c.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button onClick={handleApply}
                        className="w-full py-2.5 bg-gradient-to-r from-[#5B7FFF] to-[#4a6cd6] rounded-lg font-semibold text-white hover:opacity-90 transition shadow-lg shadow-blue-500/20">
                    Искать
                </button>
            </div>
        </div>
    );
}