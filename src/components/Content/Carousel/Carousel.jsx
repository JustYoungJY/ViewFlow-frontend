import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function Carousel() {
    const SLIDES_DATA = [
        {
            id: 1,
            title: "abc",
            description: "abc",
            buttonUrl: "/compilations/abc",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        },
        {
            id: 2,
            title: "def",
            description: "abc",
            buttonUrl: "/compilations/abc",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        },
        {
            id: 3,
            title: "ghi",
            description: "abc",
            buttonUrl: "/compilations/abc",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = SLIDES_DATA.length;

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
        const interval = setInterval(goToNextSlide, 3000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const currentSlide = SLIDES_DATA[activeIndex];

    return (
        <div className="relative h-[650px] md:h-[80vh] w-full bg-black overflow-hidden">
            <img src={currentSlide.backgroundUrl}
                 alt={currentSlide.description}
                 className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-90"/>

            <div
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#191825] to-transparent z-10"></div>

            <div
                className="relative z-10 max-w-5xl mx-auto h-full flex flex-col items-center justify-center text-center px-4 pt-16">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in-up">
                    {currentSlide.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl">
                    {currentSlide.description}
                </p>

                <Link className="bg-[#5B7FFF] text-white py-4 px-10 rounded-xl text-xl font-bold uppercase
                tracking-wider hover:bg-[#4a6cd6] transition duration-300 shadow-2xl shadow-blue-500/50"
                      to={currentSlide.buttonUrl}>
                    смотреть
                </Link>
            </div>

            <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 rounded-full bg-white/20 text-white hover:bg-white/40 transition z-20 hidden md:block"
                onClick={goToPrevSlide}
                aria-label="Предыдущий слайд">
                &lsaquo;
            </button>

            <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 rounded-full bg-white/20 text-white hover:bg-white/40 transition z-20 hidden md:block"
                onClick={goToNextSlide}
                aria-label="Следующйи слайд">
                &rsaquo;
            </button>

            <div className="absolute bottom-8 w-full flex justify-center space-x-3 z-20">
                {SLIDES_DATA.map((_, index) => (
                    <button className={`
                            w-3 h-3 rounded-full transition duration-300
                            ${
                        index === activeIndex
                            ? 'bg-[#5B7FFF] scale-125' : 'bg-white/50 hover:bg-white/80'
                    }
                        `}
                            key={index}
                            onClick={() => goToSlide(index)}
                            aria-label="Перейти к слайду ${index + 1}"/>
                ))}
            </div>

        </div>

    )
}