import {useState} from "react";
import RandomMovieCard from "../UI/Cards/RandomMovieCard.jsx";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Randomizer() {
    const [genre, setGenre] = useState("any");
    const [minYear, setMinYear] = useState(2000);
    const [maxYear, setMaxYear] = useState(2025);
    const [minRating, setMinRating] = useState(6.0);
    const [maxRating, setMaxRating] = useState(10.0);
    const [isMovie, setIsMovie] = useState(true);
    const [isSeries, setIsSeries] = useState(false);

    const [randomResult, setRandomResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const GENRES_DATA = [
        {value: "any", label: "Любой жанр"},
        {value: "drama", label: "Драма"},
        {value: "thriller", label: "Триллер"},
        {value: "comedy", label: "Комедия"},
    ];

    const handleLuckyClick = () => {
        if (!isMovie && !isSeries) {
            alert("Выберите хотя бы один тип контента: 'Фильм' или 'Сериал'!");
            return;
        }

        setIsLoading(true);
        setRandomResult(null);

        setTimeout(() => {
            if (Math.random() > 0.5) {
                const dummyResult = {
                    title: `Случайный Шедевр ${Math.floor(Math.random() * 100)}`,
                    linkUrl: `/movie/${Math.floor(Math.random() * 1000)}`,
                    backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
                };
                setRandomResult(dummyResult);
            } else {
                setRandomResult("not_found");
            }
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div id="randomizer-section"
             className="bg-gradient-to-br from-[#1a1826] to-[#2a2640] rounded-2xl p-6 md:p-10 shadow-2xl border border-[#3a3560] mt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                Рандомайзер
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Filters */}
                <div className="lg:w-1/3 space-y-14">
                    {/* Genre */}
                    <div>
                        <label htmlFor="genre-select" className="block text-white font-medium mb-2">Жанр:</label>
                        <select
                            id="genre-select"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full p-3 rounded-lg bg-[#191825] border border-[#2D2A4A] text-white focus:ring-2 focus:ring-[#5B7FFF] focus:border-[#5B7FFF] transition"
                        >
                            {GENRES_DATA.map(g => (
                                <option key={g.value} value={g.value}>{g.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-white font-medium mb-2">
                            Год: <span className="text-[#5B7FFF]">{minYear} - {maxYear}</span>
                        </label>
                        <div className="px-2">
                            <Slider
                                range={true}
                                min={1950}
                                max={2024}
                                step={1}
                                value={[minYear, maxYear]}
                                onChange={(value) => {
                                    const [newMin, newMax] = value;
                                    if (newMin > newMax) {
                                        setMinYear(newMax);
                                        setMaxYear(newMin);
                                    } else {
                                        setMinYear(newMin);
                                        setMaxYear(newMax);
                                    }
                                }}
                                trackStyle={{backgroundColor: '#5B7FFF', height: 8, borderRadius: 4}}
                                handleStyle={[
                                    {
                                        borderColor: '#5B7FFF',
                                        height: 20,
                                        width: 20,
                                        marginTop: -6,
                                        backgroundColor: 'white',
                                        opacity: 1
                                    },
                                    {
                                        borderColor: '#5B7FFF',
                                        height: 20,
                                        width: 20,
                                        marginTop: -6,
                                        backgroundColor: 'white',
                                        opacity: 1
                                    }
                                ]}
                                railStyle={{backgroundColor: '#2D2A4A', height: 8, borderRadius: 4}}
                            />
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-white font-medium mb-2">
                            Рейтинг: <span
                            className="text-[#5B7FFF]">{minRating.toFixed(1)} - {maxRating.toFixed(1)}</span>
                        </label>
                        <div className="px-2">
                            <Slider
                                range={true}
                                min={0}
                                max={10}
                                step={0.1}
                                value={[minRating, maxRating]}
                                onChange={(value) => {
                                    const [newMin, newMax] = value;
                                    if (newMin > newMax) {
                                        setMinRating(newMax);
                                        setMaxRating(newMin);
                                    } else {
                                        setMinRating(newMin);
                                        setMaxRating(newMax);
                                    }
                                }}
                                trackStyle={{backgroundColor: '#A259FF', height: 8, borderRadius: 4}}
                                handleStyle={[
                                    {
                                        borderColor: '#A259FF',
                                        height: 20,
                                        width: 20,
                                        marginTop: -6,
                                        backgroundColor: 'white',
                                        opacity: 1
                                    },
                                    {
                                        borderColor: '#A259FF',
                                        height: 20,
                                        width: 20,
                                        marginTop: -6,
                                        backgroundColor: 'white',
                                        opacity: 1
                                    }
                                ]}
                                railStyle={{backgroundColor: '#2D2A4A', height: 8, borderRadius: 4}}
                            />
                        </div>
                    </div>

                    {/* Type */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsMovie(prev => !prev)}
                            className={`py-2 px-6 rounded-lg font-semibold transition duration-200 
                ${isMovie ? 'bg-[#5B7FFF] text-white shadow-lg' : 'bg-[#191825] text-[#A6A4B0] border border-[#2D2A4A] hover:bg-[#2D2A4A]'}`}
                        >
                            Фильм
                        </button>
                        <button
                            onClick={() => setIsSeries(prev => !prev)}
                            className={`py-2 px-6 rounded-lg font-semibold transition duration-200 
                ${isSeries ? 'bg-[#A259FF] text-white shadow-lg' : 'bg-[#191825] text-[#A6A4B0] border border-[#2D2A4A] hover:bg-[#2D2A4A]'}`}
                        >
                            Сериал
                        </button>
                    </div>
                </div>

                {/* Result + Button */}
                <div className="lg:w-2/3 flex flex-col">

                    {/* Result frame */}
                    <div
                        className="flex-grow bg-gradient-to-br from-[#1a1826] to-[#2a2640] rounded-2xl border border-[#3a3560] p-6 md:p-8 shadow-xl min-h-[400px] max-h-[500px] flex flex-col justify-center items-center overflow-hidden">
                        {isLoading ? (
                            <div className="text-white text-xl animate-pulse">Идет поиск...</div>
                        ) : randomResult && randomResult !== "not_found" ? (
                            <div className="w-full h-full flex flex-col items-center">
                                <h3 className="text-white text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Ваша находка:
                                </h3>
                                <RandomMovieCard
                                    title={randomResult.title}
                                    backgroundUrl={randomResult.backgroundUrl}
                                    linkUrl={randomResult.linkUrl}
                                />
                            </div>
                        ) : randomResult === "not_found" ? (
                            <div className="text-center">
                                <p className="text-xl text-white mb-2">Ничего не найдено</p>
                                <p className="text-[#A6A4B0]">Попробуйте изменить параметры</p>
                            </div>
                        ) : (
                            <p className="text-[#A6A4B0] text-center text-lg">
                                Нажмите кнопку ниже, чтобы найти случайный фильм
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <div className="mt-2 text-center border-[#3a3560] pt-6">
                        <button
                            onClick={handleLuckyClick}
                            disabled={!isMovie && !isSeries || isLoading}
                            className={`px-16 py-4 text-2xl font-bold rounded-xl transition-all duration-300 shadow-xl transform
                                ${(!isMovie && !isSeries) || isLoading
                                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white hover:shadow-2xl hover:scale-105 active:scale-95"}`}
                        >
                            {isLoading ? "Поиск..." : "Мне повезет!"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}