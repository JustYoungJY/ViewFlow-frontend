import {useEffect, useState} from 'react';
import SeriesHeader from "../components/Content/Headers/SeriesHeader.jsx";
import VideoPlayer from "../components/UI/Video/VideoPlayer.jsx";
import Comment from "../components/UI/Comment/Comment.jsx";
import HorizontalRow from "../components/Content/Sliders/HorizontalRow.jsx";
import instance from "../api/axiosInstance.js";
import {useParams} from "react-router-dom";
import { useToast } from '../context/ToastContext.jsx';
import StarRating from "../components/UI/Ratings/StarRating.jsx";
import PlatformLink from "../components/UI/Links/PlatformLink.jsx";

export default function SeriesPage() {
    const { id } = useParams();
    const seriesId = id;

    const [series, setSeries] = useState(null);
    const [similarSeries, setSimilarSeries] = useState(null)
    const [trailerUrl, setTrailerUrl] = useState('https://www.youtube.com/embed/g_rB4v75jqU');
    const [commentRating, setCommentRating] = useState(0);
    const [isTrailer, setIsTrailer] = useState(true);
    const { showToast } = useToast();

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [watchProviders, setWatchProviders] = useState(null);
    const [torrents, setTorrents] = useState([]);
    const [zonaSeries, setZonaSeries] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(1);

    const MEDIA_TYPE = "TV";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [seriesId]);

    useEffect(() => {
        const fetchSeries = async () => {
            const response = await instance.get("/media", {
                params: {mediaId: seriesId, mediaType: MEDIA_TYPE}
            })

            const data = response.data

            const formattedSeries = {
                mediaId: Number(seriesId),
                mediaType: MEDIA_TYPE,
                kinopoiskId: data.kinopoiskId,
                title: data.title,
                year: data.releaseYear,
                directors: data.directors,
                description: data.overview,
                ratings: data.ratings,
                generalRating: data.voteAverage,
                posterUrl: data.posterPath
                    ? `https://image.tmdb.org/t/p/w500${data.posterPath}`
                    : "https://via.placeholder.com/500x750",
                country: data.country,
                genres: data.genres,
                seasons: data.numberOfSeasons,
                episodes: data.numberOfEpisodes,
            }

            setSeries(formattedSeries);

            if (data.trailerYoutubeId) {
                setTrailerUrl(`https://www.youtube.com/embed/${data.trailerYoutubeId}`);
            } else {
                setTrailerUrl(null);
            }
        }

        if(seriesId) {
            fetchSeries();
        }
    }, [seriesId]);


    useEffect(() => {

        const fetchSimilarSeries = async () => {
            const response = await instance.get("/media/similar", {
                params: {mediaId: seriesId, mediaType: MEDIA_TYPE}
            })

            const data = response.data;
            // Add mediaType property to each series
            const seriesWithType = data.map(series => ({
                ...series,
                mediaType: MEDIA_TYPE
            }));
            setSimilarSeries(seriesWithType)
        }

        if(series) {
            fetchSimilarSeries();
        }

    }, [seriesId, series]);


    useEffect(() => {
        if (!series) return;

        const fetchProviders = async () => {
            try {
                const res = await instance.get("/tmdb/providers", {
                    params: { mediaId: series.mediaId, mediaType: MEDIA_TYPE }
                });
                if (res.status === 200) {
                    setWatchProviders(res.data);
                }
            } catch (e) { console.log("Error fetching providers:", e); }
        };

        const fetchZona = async () => {
            try {
                const res = await instance.get("/zona", {
                    params: { title: series.title, year: series.year }
                });
                setZonaSeries(res.data.fullUrl);
                console.log(res.data);
            } catch (e) { console.log(e); }
        };

        fetchZona();
        fetchProviders();

    }, [series]);


    useEffect(() => {
        if (!series) return;

        const fetchTorrents = async () => {
            setTorrents([]);
            try {
                const res = await instance.get("/torrents/series", {
                    params: {
                        query: series.title,
                        season: selectedSeason
                    }
                });

                const flatList = [];
                if (res.data) {
                    Object.values(res.data).forEach(list => flatList.push(...list));
                }

                const sorted = flatList.sort((a, b) => b.seeds - a.seeds).slice(0, 5);
                setTorrents(sorted);
            } catch (e) {
                console.log("Error fetching torrents:", e);
                setTorrents([]);
            }
        };

        fetchTorrents();
    }, [series, selectedSeason]);



    const fetchComments = async (page = 0) => {
        const response = await instance.get(`/comments/media/${seriesId}/${MEDIA_TYPE}`, {
            params: {
                page: page,
                size: 5,
                sort: "createdAt,desc"
            }
        })

        const data = response.data;

        setComments(data.content)
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (commentRating < 1 || commentRating > 10) {
            showToast("Пожалуйста, поставьте оценку от 1 до 10", 'error');
            return;
        }

        if (!commentText.trim()) {
            showToast("Текст комментария не может быть пустым", 'error');
            return;
        }

        const payload = {
            mediaId: Number(seriesId),
            mediaType: MEDIA_TYPE,
            stars: commentRating,
            content: commentText.trim(),
        };

        await instance.post("/comments/media", payload);

        setCommentText("");
        setCommentRating(0);
        fetchComments(0);
    }


    useEffect(() => {
        if(seriesId) {
            fetchComments(currentPage);
        }
    }, [seriesId, currentPage]);

    if (!series) return <div className="text-white">Загрузка...</div>;

    return (
        <div className="min-h-screen bg-[#191825] text-white">

            {/* Header */}
            <SeriesHeader series={series} />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Buttons "Трейлер" and "Смотреть сериал" */}
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setIsTrailer(true)}
                        className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                            isTrailer
                                ? 'bg-[#5B7FFF] text-white shadow-lg shadow-[#5B7FFF]/20'
                                : 'bg-[#191825] text-gray-400 hover:text-white border border-[#2D2A4A] hover:border-[#5B7FFF]'
                        }`}
                    >
                        Трейлер
                    </button>
                    <button
                        onClick={() => setIsTrailer(false)}
                        className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                            !isTrailer
                                ? 'bg-[#5B7FFF] text-white shadow-lg shadow-[#5B7FFF]/20'
                                : 'bg-[#191825] text-gray-400 hover:text-white border border-[#2D2A4A] hover:border-[#5B7FFF]'
                        } ${!series?.kinopoiskId && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!series?.kinopoiskId}
                        title={!series?.kinopoiskId ? "Сериал не доступен для просмотра" : ""}
                    >
                        Смотреть сериал
                    </button>
                </div>

                <VideoPlayer
                    trailerUrl={trailerUrl}
                    isTrailer={isTrailer}
                    kinopoiskId={series?.kinopoiskId}
                />

                {/* Where to watch */}
                <section className="mt-12 w-full">
                    <h2 className="text-3xl font-bold text-white mb-6">Где смотреть</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Online cinema */}
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#10B981] bg-[#10B981]/10 shadow-lg">
                            <h3 className="font-bold text-2xl text-white">Онлайн кинотеатры</h3>
                            <div className="flex flex-col gap-3">
                                {!watchProviders || watchProviders.isEmpty ? (
                                    <p className="text-gray-400">Нет доступных онлайн кинотеатров</p>
                                ) : (
                                    <>
                                        {watchProviders.netflix && <PlatformLink name="Netflix" link={watchProviders.netflix} buttonText="Смотреть" />}
                                        {watchProviders.kinopoisk && <PlatformLink name="Кинопоиск HD" link={watchProviders.kinopoisk} buttonText="Смотреть" />}
                                        {watchProviders.okko && <PlatformLink name="Okko" link={watchProviders.okko} buttonText="Смотреть" />}
                                        {watchProviders.appleTv && <PlatformLink name="Apple TV" link={watchProviders.appleTv} buttonText="Смотреть" />}
                                        {watchProviders.amediateka && <PlatformLink name="Amediateka" link={watchProviders.amediateka} buttonText="Смотреть" />}
                                        {watchProviders.googlePlay && <PlatformLink name="Google Play" link={watchProviders.googlePlay} buttonText="Купить" />}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Free sites */}
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#F59E0B] bg-[#F59E0B]/10 shadow-lg">
                            <h3 className="font-bold text-2xl text-white">Бесплатный сайты</h3>
                            <div className="flex flex-col gap-3">
                                <PlatformLink name="Zona" link={zonaSeries} buttonText="Поиск" />
                            </div>
                        </div>

                        {/* Torrents */}
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#5B7FFF] bg-[#5B7FFF]/10 shadow-lg">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <h3 className="font-bold text-2xl text-white">Торрент</h3>

                                {/* Selector of seasons */}
                                {series.seasons > 0 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto max-w-full custom-scrollbar">
                                        {Array.from({ length: series.seasons }, (_, i) => i + 1).map((seasonNum) => (
                                            <button
                                                key={seasonNum}
                                                onClick={() => setSelectedSeason(seasonNum)}
                                                className={`px-3 py-1 rounded-md text-sm font-bold whitespace-nowrap transition-colors border ${
                                                    selectedSeason === seasonNum
                                                        ? 'bg-[#5B7FFF] border-[#5B7FFF] text-white'
                                                        : 'bg-transparent border-[#2D2A4A] text-gray-400 hover:text-white hover:border-[#5B7FFF]'
                                                }`}
                                            >
                                                Сезон {seasonNum}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                {torrents.length > 0 ? (
                                    torrents.map((tor, idx) => (
                                        <PlatformLink
                                            key={idx}
                                            name={`${tor.resolution} ${tor.quality} (${tor.size})`}
                                            link={tor.link}
                                            buttonText="Скачать"
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-400">
                                        Раздач для {selectedSeason} сезона не найдено
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                { similarSeries && (
                    <section className="mt-16 w-full">
                        <HorizontalRow title="Похожие сериалы" movies={similarSeries} />
                    </section>
                )}

                <section className="mt-16 w-full max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Комментарии и оценки</h2>

                    <form onSubmit={handleCommentSubmit}>
                        <div className="flex flex-col gap-4">
                            <textarea
                                className="w-full bg-[#121212] border border-[#2D2A4A] rounded-lg p-4 text-white placeholder-[#A6A4B0] focus:ring-[#5B7FFF] focus:border-[#5B7FFF] transition"
                                placeholder="Напишите ваш комментарий к сериалу..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required
                                rows="5"
                            ></textarea>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <StarRating
                                    count={10}
                                    rating={commentRating}
                                    onRating={setCommentRating}
                                />

                                <button className="w-full sm:w-auto px-6 py-2.5 font-bold text-white rounded-md
                                bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90 transition-opacity"
                                        type="submit"
                                        disabled={!commentText.trim() || commentRating === 0}
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </form>


                    <div className="space-y-6">
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))
                        ) : (
                            <p className="text-gray-400 text-lg">Комментариев пока нет. Будьте первыми!</p>
                        )}
                    </div>

                    {/*Pagination*/}
                    <div className="mt-10 flex justify-center space-x-2">
                        {/*Button forward*/}
                        {currentPage > 0 && (
                            <button
                                onClick={() => {
                                    setCurrentPage(currentPage - 1);
                                }}
                                className="px-4 py-2 rounded-lg font-semibold bg-[#2D2A47] text-gray-300 hover:bg-[#5B7FFF] transition-colors"
                            >
                                Назад
                            </button>
                        )}

                        {/*Buttons with number*/}
                        {(() => {
                            const maxVisiblePages = 5;
                            let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
                            let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

                            if (endPage - startPage < maxVisiblePages - 1) {
                                startPage = Math.max(0, endPage - maxVisiblePages + 1);
                            }

                            const pages = [];
                            for (let i = startPage; i <= endPage; i++) {
                                pages.push(
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setCurrentPage(i);
                                        }}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                            currentPage === i
                                                ? 'bg-[#A259FF] text-white'
                                                : 'bg-[#2D2A47] text-gray-300 hover:bg-[#5B7FFF]'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            }
                            return pages;
                        })()}

                        {/*Button backward*/}
                        {currentPage < totalPages - 1 && (
                            <button
                                onClick={() => {
                                    setCurrentPage(currentPage + 1);
                                }}
                                className="px-4 py-2 rounded-lg font-semibold bg-[#2D2A47] text-gray-300 hover:bg-[#5B7FFF] transition-colors"
                            >
                                Вперед
                            </button>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}
