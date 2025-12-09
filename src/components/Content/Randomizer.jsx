import {useEffect, useState} from "react";
import { Link } from "react-router-dom"; // Не забудьте этот импорт
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useToast } from "../../context/ToastContext.jsx";
import instance from "../../api/axiosInstance.js";

export default function Randomizer() {
    const [genre, setGenre] = useState(0);
    const [minYear, setMinYear] = useState(2000);
    const [maxYear, setMaxYear] = useState(2025);
    const [minRating, setMinRating] = useState(6.0);
    const [maxRating, setMaxRating] = useState(10.0);
    const [isMovie, setIsMovie] = useState(true);
    const [isSeries, setIsSeries] = useState(false);

    const [genresData, setGenresData] = useState([{ id: 0, genre: "любой жанр" }]);

    const [randomResult, setRandomResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
        const fetchGenres = async () => {

            const response = await instance.get("/media/genres");

            const allGenres = [{ id: 0, genre: "любой жанр" }, ...response.data];
            setGenresData(allGenres);

        };

        fetchGenres();
    }, []);


    const handleLuckyClick = async () => {
        if (!isMovie && !isSeries) {
            showToast("Выберите хотя бы один тип контента: 'Фильм' или 'Сериал'!", 'error');
            return;
        }

        setIsLoading(true);
        setRandomResult(null);

        try {
            const genreIdToSend = parseInt(genre);

            let randomType;
            if (isMovie && isSeries) {
                randomType = Math.random() < 0.5 ? "FILM" : "TV_SERIES";
            } else if (isMovie) {
                randomType = "FILM";
            } else {
                randomType = "TV_SERIES";
            }

            const params = new URLSearchParams({
                minYear,
                maxYear,
                minRating,
                maxRating,
                randomType,
            });

            if (genreIdToSend > 0) {
                params.append('genreId', genreIdToSend);
            }

            const response = await instance.get(`/media/random?${params.toString()}`);

            if (response.status === 204 || !response.data) {
                setRandomResult("not_found");
            } else {
                setRandomResult(response.data);
            }

        } catch (error) {
            console.error("Ошибка при поиске фильма:", error);
            setRandomResult({ error: true });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
             className="bg-[#1a1826] rounded-3xl p-6 md:p-10 shadow-2xl border border-[#2D2A4A] mt-12 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5B7FFF] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

            <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white mb-10 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Рандомайзер
                </span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-10 relative z-10">

                {/* Filters */}
                <div className="lg:w-1/3 space-y-10 bg-[#222032] p-6 rounded-2xl border border-[#2D2A4A]">
                    {/* Genre */}
                    <div>
                        <label htmlFor="genre-select" className="block text-gray-300 font-medium mb-3 text-sm uppercase tracking-wider">Жанр</label>
                        <select
                            id="genre-select"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full p-3 rounded-xl bg-[#191825] border border-[#2D2A4A] text-white focus:ring-2 focus:ring-[#5B7FFF] focus:border-transparent outline-none transition duration-200"
                        >
                            {genresData.map(g => (
                                <option key={g.id} value={g.id}>{g.genre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-300 font-medium text-sm uppercase tracking-wider">Год выпуска</span>
                            <span className="text-[#5B7FFF] font-bold">{minYear} — {maxYear}</span>
                        </div>
                        <div className="px-2">
                            <Slider
                                range={true}
                                min={1950}
                                max={2025}
                                value={[minYear, maxYear]}
                                onChange={(val) => {
                                    const [nMin, nMax] = val;
                                    nMin > nMax ? (setMinYear(nMax), setMaxYear(nMin)) : (setMinYear(nMin), setMaxYear(nMax));
                                }}
                                trackStyle={{ backgroundColor: '#5B7FFF', height: 6 }}
                                handleStyle={[
                                    { borderColor: '#5B7FFF', backgroundColor: '#fff', opacity: 1, boxShadow: '0 0 10px rgba(91, 127, 255, 0.5)' },
                                    { borderColor: '#5B7FFF', backgroundColor: '#fff', opacity: 1, boxShadow: '0 0 10px rgba(91, 127, 255, 0.5)' }
                                ]}
                                railStyle={{ backgroundColor: '#2D2A4A', height: 6 }}
                            />
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-300 font-medium text-sm uppercase tracking-wider">Рейтинг</span>
                            <span className="text-[#A259FF] font-bold">{minRating.toFixed(1)} — {maxRating.toFixed(1)}</span>
                        </div>
                        <div className="px-2">
                            <Slider
                                range={true}
                                min={0}
                                max={10}
                                step={0.1}
                                value={[minRating, maxRating]}
                                onChange={(val) => {
                                    const [nMin, nMax] = val;
                                    nMin > nMax ? (setMinRating(nMax), setMaxRating(nMin)) : (setMinRating(nMin), setMaxRating(nMax));
                                }}
                                trackStyle={{ backgroundColor: '#A259FF', height: 6 }}
                                handleStyle={[
                                    { borderColor: '#A259FF', backgroundColor: '#fff', opacity: 1, boxShadow: '0 0 10px rgba(162, 89, 255, 0.5)' },
                                    { borderColor: '#A259FF', backgroundColor: '#fff', opacity: 1, boxShadow: '0 0 10px rgba(162, 89, 255, 0.5)' }
                                ]}
                                railStyle={{ backgroundColor: '#2D2A4A', height: 6 }}
                            />
                        </div>
                    </div>

                    {/* Type Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setIsMovie(prev => !prev)}
                            className={`py-3 rounded-xl font-semibold transition-all duration-300 border
                            ${isMovie
                                ? 'bg-[#5B7FFF]/10 border-[#5B7FFF] text-[#5B7FFF] shadow-[0_0_15px_rgba(91,127,255,0.3)]'
                                : 'bg-[#191825] border-[#2D2A4A] text-gray-500 hover:border-gray-500'}`}
                        >
                            Фильмы
                        </button>
                        <button
                            onClick={() => setIsSeries(prev => !prev)}
                            className={`py-3 rounded-xl font-semibold transition-all duration-300 border
                            ${isSeries
                                ? 'bg-[#A259FF]/10 border-[#A259FF] text-[#A259FF] shadow-[0_0_15px_rgba(162,89,255,0.3)]'
                                : 'bg-[#191825] border-[#2D2A4A] text-gray-500 hover:border-gray-500'}`}
                        >
                            Сериалы
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:w-2/3 flex flex-col h-full min-h-[500px]">

                    <div className="flex-grow bg-[#222032] rounded-2xl border border-[#2D2A4A] p-6 md:p-8 shadow-inner relative flex flex-col justify-center items-center overflow-hidden">

                        {isLoading ? (
                            <div className="flex flex-col items-center animate-pulse">
                                <div className="w-16 h-16 border-4 border-[#5B7FFF] border-t-transparent rounded-full animate-spin mb-4"></div>
                                <span className="text-white text-lg font-medium">Подбираем лучшее...</span>
                            </div>
                        ) : randomResult && randomResult !== "not_found" ? (
                            // Card result
                            <div className="w-full h-full flex flex-col md:flex-row gap-8 items-start animate-fade-in-up">
                                {/* Poster */}
                                <div className="w-full md:w-56 flex-shrink-0 mx-auto md:mx-0">
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#3a3560] group">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${randomResult.posterUrl}`}
                                            alt={randomResult.title}
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="flex flex-col flex-grow text-center md:text-left">
                                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                                        {randomResult.title}
                                    </h3>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                                        <span className="bg-[#2D2A4A] text-[#A259FF] px-3 py-1 rounded-lg text-sm font-bold border border-[#3a3560]">
                                            {randomResult.rating} ★
                                        </span>
                                        <span className="bg-[#2D2A4A] text-gray-300 px-3 py-1 rounded-lg text-sm font-medium border border-[#3a3560]">
                                            {randomResult.year}
                                        </span>
                                        <span className="text-gray-400 text-sm">{randomResult.genres?.join(', ')}</span>
                                    </div>

                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-5">
                                        {randomResult.description || "Описание отсутствует. Но поверьте, фильм стоит того, чтобы его посмотреть!"}
                                    </p>

                                    <div className="mt-auto pt-4 md:pt-0">
                                        <Link
                                            to={`/${randomResult.mediaType?.toLowerCase()}/${randomResult.mediaId}`}
                                            className="inline-block w-full md:w-auto bg-[#5B7FFF] hover:bg-[#4a6cd6] text-white font-semibold py-3 px-8 rounded-xl transition shadow-[0_4px_20px_rgba(91,127,255,0.3)] hover:shadow-[0_4px_25px_rgba(91,127,255,0.5)] transform hover:-translate-y-1 text-center"
                                        >
                                            Смотреть сейчас
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : randomResult === "not_found" ? (
                            <div className="text-center">
                                <div className="text-6xl mb-4">😕</div>
                                <p className="text-xl text-white font-bold mb-2">Ничего не найдено</p>
                                <p className="text-[#A6A4B0]">Попробуйте расширить диапазон фильтров</p>
                            </div>
                        ) : (
                            <div className="text-center opacity-50">
                                <p className="text-2xl text-white font-semibold">Испытай удачу</p>
                                <p className="text-sm mt-2 max-w-xs mx-auto">Нажми кнопку ниже, и мы подберем для тебя идеальный фильм на вечер</p>
                            </div>
                        )}
                    </div>

                    {/* Big button */}
                    <div className="mt-6">
                        <button
                            onClick={handleLuckyClick}
                            disabled={!isMovie && !isSeries || isLoading}
                            className={`w-full py-5 text-xl font-bold rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group
                                ${(!isMovie && !isSeries) || isLoading
                                ? "bg-[#2D2A4A] text-gray-500 cursor-not-allowed border border-[#3a3560]"
                                : "bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white hover:shadow-[0_0_30px_rgba(162,89,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"}`}
                        >
                            {isLoading ? "Ищем шедевр..." : (
                                <>
                                    <span>Мне повезет!</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}