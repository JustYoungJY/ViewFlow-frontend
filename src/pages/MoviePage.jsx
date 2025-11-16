import {useEffect, useState} from 'react';
import MovieHeader from "../components/Content/Headers/MovieHeader.jsx";
import VideoPlayer from "../components/UI/Video/VideoPlayer.jsx";
import Comment from "../components/UI/Comment/Comment.jsx";
import HorizontalRow from "../components/Content/Sliders/HorizontalRow.jsx";

export default function MoviePage({ movieId }) {
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState('https://www.youtube.com/embed/g_rB4v75jqU'); // Трейлер Матрицы
    const [filmUrl, setFilmUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ'); // Заглушка
    const [commentRating, setCommentRating] = useState(0);


    const similarMovies = [
        { id: 10, title: "Начало", posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/840c66b0-94d3-4610-b186-c313200b36c4/600x900", year: 2010, genre: "Фантастика", rating: 8.7 },
        { id: 11, title: "Интерстеллар", posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900", year: 2014, genre: "Фантастика", rating: 8.6 },
        { id: 12, title: "Тринадцатый этаж", posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/840c8f94-7164-4a6c-a25e-8515a463f6d7/600x900", year: 1999, genre: "Фантастика", rating: 7.8 },
        { id: 13, title: "Темный город", posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/c6c84c17-f670-4351-912f-442c8d625574/600x900", year: 1998, genre: "Фантастика", rating: 7.6 },
    ];

    useEffect(() => {
        const dummyMovie = {
            title: 'Матрица',
            year: 1999,
            director: 'Вачовски',
            description: 'Жизнь Томаса Андерсона разделена на две части: днём он самый обычный офисный работник, получающий нагоняи от начальства, а ночью — хакер Нео, и нет такого преступления в сети, которое он не смог бы совершить...',
            ratings: {
                imdb: 8.7,
                kinopoisk: 8.5,
                rotten: 88, // %
            },
            generalRating: 8.6,
            viewflowRating: 9.1,
            posterUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/258fc3d6-8223-40ce-94ea-c87c2acc9f4b/180',
            country: 'США',
            genres: ['Фантастика', 'Боевик', 'Триллер'],
            budget: '$63 000 000',
        };
        setMovie(dummyMovie);
    }, [movieId]);

    if (!movie) return <div className="text-white">Загрузка...</div>;

    return (
        <div className="min-h-screen bg-[#191825] text-white">

            <MovieHeader movie={movie} />

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
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#F59E0B] bg-[#F59E0B]/10 shadow-lg">
                            <h3 className="font-bold text-2xl text-white">Нелегально</h3>
                            <div className="flex flex-col gap-3">
                                <PlatformLink name="HDRezka" />
                                <PlatformLink name="LordFilm" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl p-6 border-2 border-[#5B7FFF] bg-[#5B7FFF]/10 shadow-lg">
                            <h3 className="font-bold text-2xl text-white">Торрент</h3>
                            <div className="flex flex-col gap-3">
                                <PlatformLink name="Rutracker" buttonText="Скачать" />
                                <PlatformLink name="1337x" buttonText="Magnet" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-16 w-full">
                    <HorizontalRow title="Похожие фильмы" movies={similarMovies} />
                </section>


                <section className="mt-16 w-full max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">Комментарии</h2>
                    <div className="flex flex-col gap-4">
                        <textarea
                            className="w-full bg-[#121212] border border-[#2D2A4A] rounded-lg p-4 text-white placeholder-[#A6A4B0] focus:ring-[#5B7FFF] focus:border-[#5B7FFF] transition"
                            placeholder="Напишите ваш комментарий..."
                            rows="5"
                        ></textarea>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <StarRating
                                count={10}
                                rating={commentRating}
                                onRating={setCommentRating}
                            />

                            <button className="w-full sm:w-auto px-6 py-2.5 font-bold text-white rounded-md bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90 transition-opacity">
                                Отправить
                            </button>
                        </div>
                    </div>


                    <div className="flex flex-col gap-6 mt-10 border-t border-[#2D2A4A] pt-8">
                        <Comment
                            avatar="https://i.pravatar.cc/150?img=1"
                            username="NeoFan_99"
                            text="Фильм, который изменил всё! До сих пор пересматриваю и нахожу новые смыслы. Классика, которую должен увидеть каждый."
                        />
                        <Comment
                            avatar="https://i.pravatar.cc/150?img=5"
                            username="TrinityLover"
                            text="Невероятный экшн и глубокая философия. Этот фильм просто взорвал мне мозг в 99-м."
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}


function PlatformLink({ name, buttonText = "Смотреть" }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-md backdrop-blur-sm">
            <p className="font-semibold text-lg">{name}</p>
            <button className="px-5 py-2 text-sm font-bold text-white rounded-md bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90 transition-opacity">
                {buttonText}
            </button>
        </div>
    );
}


function StarRating({ count, rating, onRating }) {
    return (
        <div className="flex items-center gap-1">
            {[...Array(count)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={starValue}
                        className={`cursor-pointer text-2xl transition-colors ${
                            starValue <= rating
                                ? 'text-yellow-400'
                                : 'text-gray-600 hover:text-gray-400'
                        }`}
                        onClick={() => onRating(starValue)}
                        onMouseEnter={() => { }}
                        onMouseLeave={() => { }}
                    >
                        ★
                    </span>
                );
            })}
            <span className="ml-3 text-lg font-bold text-white">{rating} / {count}</span>
        </div>
    );
}
