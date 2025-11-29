import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import instance from "../../../api/axiosInstance.js";

export default function Carousel() {
    const [slidesData, setSlidesData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = slidesData.length;

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await instance.get("/media/now-playing");
                const filteredSlides = response.data.filter(slide => slide.posterUrl);
                setSlidesData(filteredSlides);
            } catch (e) {
                console.error("Failed to load carousel", e);
            }
        }
        fetchSlides();
    }, [])

    const goToPrevSlide = () => {
        setActiveIndex((prevIndex) => prevIndex === 0 ? totalSlides - 1 : prevIndex - 1);
    }

    const goToNextSlide = () => {
        setActiveIndex((nextIndex) => nextIndex === totalSlides - 1 ? 0 : nextIndex + 1);
    }

    const goToSlide = (index) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        if (totalSlides > 0) {
            const interval = setInterval(goToNextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [activeIndex, totalSlides]);

    const currentSlide = slidesData[activeIndex];

    if (!currentSlide) {
        return (
            <div className="h-[650px] md:h-[80vh] w-full bg-[#191825] flex items-center justify-center text-white">
                <div className="animate-pulse">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="relative h-[650px] md:h-[80vh] w-full bg-[#191825] overflow-hidden group">

            <div className="absolute inset-0">
                <img
                    src={currentSlide.posterUrl}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover object-top transition-opacity duration-700 opacity-100"
                />

                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#191825] via-[#191825]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#191825]/90 via-transparent to-transparent"></div>
            </div>

            <div className="absolute inset-0 flex items-center ml-8 md:items-end justify-start px-6 md:px-16 pb-12 md:pb-24 z-20">
                <div className="max-w-2xl w-full animate-fade-in-up">

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg leading-tight">
                        {currentSlide.title}
                    </h1>

                    <p className="text-base md:text-lg text-gray-200 mb-8 font-medium drop-shadow-md line-clamp-3 md:line-clamp-4 leading-relaxed">
                        {currentSlide.description}
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            to={`/${currentSlide.mediaType.toLowerCase()}/${currentSlide.mediaId}`}
                            className="bg-[#5B7FFF] text-white py-3 px-8 rounded-lg text-lg font-bold
                                     hover:bg-[#4a6cd6] transition duration-300 shadow-lg shadow-blue-500/30
                                     flex items-center gap-2 transform hover:scale-105 active:scale-95"
                        >
                            <span className="material-symbols-outlined">play_arrow</span>
                            Смотреть
                        </Link>
                    </div>
                </div>
            </div>

            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white
                           hover:bg-[#5B7FFF] transition opacity-0 group-hover:opacity-100 z-30 hidden md:block"
                onClick={goToPrevSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white
                           hover:bg-[#5B7FFF] transition opacity-0 group-hover:opacity-100 z-30 hidden md:block"
                onClick={goToNextSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            <div className="absolute right-8 bottom-8 md:bottom-12 flex space-x-2 z-30">
                {slidesData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === activeIndex ? 'w-8 bg-[#5B7FFF]' : 'w-4 bg-gray-500/50 hover:bg-gray-400'
                        }`}
                        aria-label={`Слайд ${index + 1}`}
                    />
                ))}
            </div>

        </div>
    )
}