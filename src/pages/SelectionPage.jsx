import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/UI/Comment/Comment.jsx';
import SelectionHeader from "../components/Content/Headers/SelectionHeader.jsx";
import SelectionDetails from "../components/Content/SelectionDetails.jsx";
import SelectionMovieItem from "../components/UI/Items/SelectionMovieItem.jsx"


// Dummy data
const dummyCompilation = {
    id: 1,
    title: "Фильмы Кристофера Нолана",
    author: "nolan_fan",
    description: "Путешествие по умопомрачительной фильмографии Кристофера Нолана, исследующей темы времени, памяти и реальности. Каждая работа — это шедевр, заставляющий задуматься.",
    imageUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg",
    tags: ["#Фантастика", "#Драма", "#Триллер", "#Культовое"],
    stats: {
        movieCount: 12,
        totalDuration: "28ч 34м",
        avgRating: "8.6/10",
    },
    movies: [
        {
            id: 10,
            title: "Начало",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/840c66b0-94d3-4610-b186-c313200b36c4/600x900",
            year: 2010,
            duration: "2ч 28м",
            genres: ["Фантастика", "Триллер", "Драма"],
            description: "Вор, который крадет корпоративные секреты с помощью технологии обмена снами, получает обратную задачу: внедрить идею в сознание...",
            details: {
                country: "США, Великобритания",
                director: "Кристофер Нолан",
                budget: "$160 000 000",
            },
            trailerUrl: "https://www.youtube.com/embed/g_rB4v75jqU",
            authorNote: "Этот фильм — мой любимый. Идея со снами во сне просто взорвала мне мозг, когда я впервые его увидел. Обратите внимание на музыку!"
        },
        {
            id: 11,
            title: "Интерстеллар",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
            year: 2014,
            duration: "2ч 49м",
            genres: ["Фантастика", "Драма", "Приключения"],
            description: "Команда исследователей путешествует через червоточину в космосе, пытаясь обеспечить выживание человечества.",
            details: {
                country: "США, Великобритания, Канада",
                director: "Кристофер Нолан",
                budget: "$165 000 000",
            },
            trailerUrl: "https://www.youtube.com/embed/m2vijtHPDhc",
            authorNote: null // У этого фильма нет заметки автора
        },
        {
            id: 12,
            title: "Темный рыцарь",
            posterUrl: "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/0e4088b4-8e04-4632-9c56-c73e04c063c6/600x900",
            year: 2008,
            duration: "2ч 32м",
            genres: ["Фантастика", "Боевик", "Триллер"],
            description: "Когда Джокер сеет хаос в Готэме, Бэтмен должен принять одно из величайших психологических и физических испытаний...",
            details: {
                country: "США, Великобритания",
                director: "Кристофер Нолан",
                budget: "$185 000 000",
            },
            trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
            authorNote: "Лучший Джокер всех времен. Хит Леджер был гениален."
        }
    ],
    comments: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=5", username: "TrinityLover", text: "Невероятная подборка! 'Начало' — просто шедевр." },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=7", username: "AgentSmith", text: "Хороший список, но где 'Помни'?" }
    ]
};


export default function CompilationPage() {
    const [compilation, setCompilation] = useState(null);
    const { id } = useParams(); // Получаем ID подборки из URL

    useEffect(() => {
        setCompilation(dummyCompilation);
    }, [id]);

    const [commentText, setCommentText] = useState("");

    if (!compilation) {
        return <div className="text-white text-center p-10">Загрузка...</div>;
    }

    return (
        <div className="bg-[#0F0A1F] min-h-screen">
            <SelectionHeader
                title={compilation.title}
                imageUrl={compilation.imageUrl}
                tags={compilation.tags}
            />

            <SelectionDetails
                description={compilation.description}
                stats={compilation.stats}
            />


            <main className="max-w-5xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-white mb-8">Фильмы в подборке</h2>
                <div className="flex flex-col gap-6">
                    {compilation.movies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className={`p-4 md:p-6 rounded-xl transition-colors ${index % 2 === 0 ? 'bg-[#1a162c]' : 'bg-transparent'}`}
                        >
                            <SelectionMovieItem
                                movie={movie}
                                authorNote={movie.authorNote}
                            />
                        </div>
                    ))}
                </div>
            </main>

            {/* Comments */}
            <section className="max-w-3xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-white mb-8">Обсуждение</h2>

                <div className="flex flex-col gap-4 mb-12">
                    <textarea
                        className="w-full bg-[#1a162c] border border-[#2D2A4A] rounded-lg p-4 text-white placeholder-[#A6A4B0] focus:ring-[#5B7FFF] focus:border-[#5B7FFF] transition"
                        placeholder="Напишите ваш комментарий..."
                        rows="4"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button className="w-full sm:w-auto px-6 py-2.5 font-bold text-white rounded-md bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90 transition-opacity self-end">
                        Отправить
                    </button>
                </div>

                {/* List of existing comments */}
                <div className="space-y-8">
                    {compilation.comments.map(comment => (
                        <Comment
                            key={comment.id}
                            avatar={comment.avatar}
                            username={comment.username}
                            text={comment.text}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
