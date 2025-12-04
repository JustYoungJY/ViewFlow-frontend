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
    const [filmUrl, setFilmUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
    const [commentRating, setCommentRating] = useState(0);
    const { showToast } = useToast();

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

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

                <VideoPlayer trailerUrl={trailerUrl} movieUrl={filmUrl} />

                <section className="mt-12 w-full">
                    <h2 className="text-3xl font-bold text-white mb-6">Где смотреть</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#10B981] bg-[#10B981]/10 shadow-lg">
                            <h3 className="font-bold text-2xl text-white">Легально</h3>
                            <div className="flex flex-col gap-3">
                                <PlatformLink name="Netflix" />
                                <PlatformLink name="Кинопоиск HD" />
                                <PlatformLink name="Amediateka" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#F59E0B] bg-[#F59E0B]/10 shadow-lg">
                            <h3 className="font-bold text-2xl text-white">Нелегально</h3>
                            <div className="flex flex-col gap-3">
                                <PlatformLink name="HDRezka" />
                                <PlatformLink name="SeasonVar" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#5B7FFF] bg-[#5B7FFF]/10 shadow-lg">
                            <h3 className="font-bold text-2xl text-white">Торрент</h3>
                            <div className="flex flex-col gap-3">
                                <PlatformLink name="Rutracker" buttonText="Скачать" />
                                <PlatformLink name="Rutor" buttonText="Magnet" />
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
