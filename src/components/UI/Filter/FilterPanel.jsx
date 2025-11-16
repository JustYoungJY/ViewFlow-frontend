import {useState} from 'react';
import Slider from "rc-slider";

export default function FilterPanel({onApply}) {
    const [localFilters, setLocalFilters] = useState({
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

    const handleChange = (e) => {
        setLocalFilters({...localFilters, [e.target.name]: e.target.value});
    };

    const handleSliderChange = (name, values) => {
        setLocalFilters({...localFilters, [`min${name}`]: values[0], [`max${name}`]: values[1]});
    };

    const handleApply = () => {
        onApply(localFilters);
    };

    return (
        <div
            className="w-full lg:w-64 bg-[#191825] p-4 rounded-lg border border-[#2D2A4A] shadow-lg lg:sticky lg:top-20 self-start">
            <h3 className="text-xl font-bold text-white mb-4">Фильтры</h3>

            <div className="space-y-4">
                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Тип</span>
                    <select name="type" value={localFilters.type} onChange={handleChange}
                            className="w-full mt-1 p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white">
                        <option value="any">Любой</option>
                        <option value="movie">Фильм</option>
                        <option value="series">Сериал</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Жанр</span>
                    <select name="genre" value={localFilters.genre} onChange={handleChange}
                            className="w-full mt-1 p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white">
                        <option value="">Любой</option>
                        <option value="drama">Драма</option>
                        <option value="thriller">Триллер</option>
                        <option value="comedy">Комедия</option>
                        {/* Add more Genre */}
                    </select>
                </label>

                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Год: {localFilters.minYear} - {localFilters.maxYear}</span>
                    <div className="mt-2">
                        <Slider
                            range
                            min={1950}
                            max={2025}
                            value={[localFilters.minYear, localFilters.maxYear]}
                            onChange={(values) => handleSliderChange('Year', values)}
                            trackStyle={[{backgroundColor: '#5B7FFF'}]}
                            handleStyle={[
                                {
                                    borderColor: '#5B7FFF',
                                    backgroundColor: '#5B7FFF',
                                    boxShadow: '0 0 8px rgba(91,127,255,0.5)'
                                },
                                {
                                    borderColor: '#5B7FFF',
                                    backgroundColor: '#5B7FFF',
                                    boxShadow: '0 0 8px rgba(91,127,255,0.5)'
                                },
                            ]}
                            railStyle={{backgroundColor: '#2D2A4A'}}
                        />
                    </div>
                </label>

                <label className="block">
                    <span
                        className="text-[#A6A4B0] text-sm">Рейтинг: {localFilters.minRating} - {localFilters.maxRating}</span>
                    <div className="mt-2">
                        <Slider
                            range
                            min={0}
                            max={10}
                            step={0.1}
                            value={[localFilters.minRating, localFilters.maxRating]}
                            onChange={(values) => handleSliderChange('Rating', values)}
                            trackStyle={[{backgroundColor: '#A259FF'}]}
                            handleStyle={[
                                {
                                    borderColor: '#A259FF',
                                    backgroundColor: '#A259FF',
                                    boxShadow: '0 0 8px rgba(162,89,255,0.5)'
                                },
                                {
                                    borderColor: '#A259FF',
                                    backgroundColor: '#A259FF',
                                    boxShadow: '0 0 8px rgba(162,89,255,0.5)'
                                },
                            ]}
                            railStyle={{backgroundColor: '#2D2A4A'}}
                        />
                    </div>
                </label>

                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Страна</span>
                    <select name="country" value={localFilters.country} onChange={handleChange}
                            className="w-full mt-1 p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white">
                        <option value="">Любая</option>
                        <option value="USA">США</option>
                        <option value="RU">Россия</option>
                        {/* Add more countries */}
                    </select>
                </label>

                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Язык</span>
                    <select name="language" value={localFilters.language} onChange={handleChange}
                            className="w-full mt-1 p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white">
                        <option value="">Любой</option>
                        <option value="ru">Русский</option>
                        <option value="en">Английский</option>
                        {/* Add more languages */}
                    </select>
                </label>

                <label className="block">
                    <span className="text-[#A6A4B0] text-sm">Платформа</span>
                    <select name="platform" value={localFilters.platform} onChange={handleChange}
                            className="w-full mt-1 p-2 bg-[#121212] border border-[#2D2A4A] rounded text-white">
                        <option value="">Любая</option>
                        <option value="netflix">Netflix</option>
                        <option value="kinopoisk">Кинопоиск</option>
                        {/* Add more platforms */}
                    </select>
                </label>

                <button onClick={handleApply}
                        className="w-full py-2 bg-[#5B7FFF] rounded-lg font-semibold text-white hover:bg-[#4a6cd6] transition">
                    Искать
                </button>
            </div>
        </div>
    );
}