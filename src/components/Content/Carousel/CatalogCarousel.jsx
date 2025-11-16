import {useEffect, useState} from "react";
import Badge from "../../UI/Badges/Badge.jsx";
import CatalogButton from "../../UI/Buttons/CatalogButton.jsx";


export default function CatalogCarousel() {
    const MOVIE_DATA = [
        {
            tagType: "new",
            tag: "Новый фильм",
            title: "Самый крутой фильм",
            description: "Смотрите только здесь самый крутой фильм",
            year: 2005,
            duration: 120,
            genres: ["drama", "action"],
            posterUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        },
        {
            tagType: "new",
            tag: "НЕ Новый фильм",
            title: "НЕ Самый крутой фильм",
            description: "НЕ Смотрите только здесь самый крутой фильм",
            year: 2005,
            duration: 120,
            genres: ["drama", "action"],
            posterUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (
                (prevIndex + 1) % MOVIE_DATA.length
            ))
        }, 5000)

        return () => clearInterval(intervalId);
    }, [])

    const currentMovie = MOVIE_DATA[currentIndex];
    if (!currentMovie) return <div
        className="h-[500px] bg-gray-800 flex items-center justify-center ">Загрузка...</div>;

    const {tagType, tag, title, description, year, duration, genres, posterUrl} = currentMovie

    return (
        <div className="bg-gray-900 text-white h-[500px] flex items-center p-8 md:p-16">

            <div className="w-full md:w-2/3 space-y-4 pr-8">
                <Badge type={tagType}>{tag}</Badge>

                <h1 className="text-5xl font-extrabold leading-tight">{title}</h1>
                <p className="text-gray-300 text-lg max-w-xl">{description}</p>

                <div className="flex items-center text-sm space-x-3 text-gray-300 pt-1">
                    <span className="font-semibold">{year}</span>
                    <span className="text-gray-500">•</span>
                    <span>{duration}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">
                        {genres && genres.join(', ')}
                    </span>
                </div>

                <div className="flex space-x-4 pt-4">
                    <CatalogButton primary to={`/watch/${currentMovie.id}`} icon="▶">Watch</CatalogButton>
                    <CatalogButton to={`/collection/add/${currentMovie.id}`} icon="+">Add to collection</CatalogButton>
                </div>
            </div>

            <div className="hidden md:flex md:w-1/3 justify-start items-center -ml-20">
                <div className="w-full max-w-xm h-96 bg-gray-700 rounded-lg shadow-2xl overflow-hidden">
                    <img className="w-full h-full object-cover opacity-70" src={posterUrl} alt={title}/>
                </div>
            </div>

        </div>

    )

}