import Carousel from "../components/Content/Carousel/Carousel.jsx";
import HorizontalSlider from "../components/Content/Sliders/HorizontalSlider.jsx";
import {Link} from "react-router-dom";
import Categories from "../components/Content/Сategories.jsx";
import Randomizer from "../components/Content/Randomizer.jsx";


export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Carousel />

            <section className="py-12 max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">

                    <h2 className="font-bold text-[32px] md:text-[40px] text-white drop-shadow-[0_2px_12px_#A259FF33]">
                        Новые подборки
                    </h2>

                    <Link
                        to="/compilations"
                        className="bg-[#5B7FFF] text-white py-2 px-4 rounded-lg text-lg font-semibold
                        hover:bg-[#4a6cd6] transition duration-300 whitespace-nowrap shadow-md"
                    >
                        Смотреть все
                    </Link>
                </div>

                <HorizontalSlider />
            </section>

            <section className="py-12 max-w-7xl mx-auto px-4">
                <h2 className="font-bold text-[32px] text-white drop-shadow-[0_2px_12px_#A259FF33] mb-8 text-center">
                    Популярные категории
                </h2>

                <Categories />
            </section>

            <section className="py-12 max-w-7xl mx-auto px-4">
                <Randomizer />
            </section>
        </div>
    )
}
