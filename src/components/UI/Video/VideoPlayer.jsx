// src/components/Content/VideoPlayer.jsx

import {useState} from "react";


export default function VideoPlayer({trailerUrl, movieUrl}) {
    const [selectedTab, setSelectedTab] = useState(trailerUrl !== null ? "trailer" : "movie");


    return (
        <div className="mb-8">
            <div className="flex gap-4 mb-4">
                {trailerUrl && (
                    <button
                        className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${selectedTab === "trailer" ? "bg-[#A259FF] text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
                        onClick={() => setSelectedTab("trailer")}>
                        Трейлер
                    </button>
                )}


                <button
                    className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${selectedTab === "movie" ? "bg-[#A259FF] text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
                    onClick={() => setSelectedTab("movie")}>
                    Смотреть фильм
                </button>
            </div>

            <iframe className="w-full aspect-video rounded-xl shadow-xl border-4 border-[#2D2A4A]"
                    src={selectedTab === "trailer" ? trailerUrl : movieUrl}
                    frameBorder="0"
                    allowFullScreen>
            </iframe>
        </div>
    )

}