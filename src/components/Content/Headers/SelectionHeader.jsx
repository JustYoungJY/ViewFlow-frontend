import {useState} from "react";


export default function SelectionHeader({title, imageUrl, tags}) {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    return (
        <section
            className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center text-center text-white p-8">


            <img
                src={imageUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>


            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                    {title}
                </h1>


                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-sm font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <button
                    onClick={handleToggleFavorite}
                    className={`flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                        isFavorite
                            ? 'bg-[#FF6B6B] text-white shadow-lg shadow-red-500/30'
                            : 'bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white hover:opacity-80 shadow-lg shadow-purple-500/30'
                    }`}
                >
                    <span className="material-symbols-outlined text-xl">
                        {isFavorite ? 'favorite' : 'favorite_border'}
                    </span>
                    {isFavorite ? 'В избранном' : 'Добавить в избранное'}
                </button>
            </div>
        </section>
    );
}
