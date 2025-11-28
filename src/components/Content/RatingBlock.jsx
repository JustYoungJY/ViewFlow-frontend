import viewFlowLogo from "/logo.png"
import IMDBLogo from "/IMDBLogo.png"
import kinopoiskLogo from "/kinopoiskLogo.png"
import rottenLogo from "/rottenLogo.png"
import tmdbLogo from "/tmdbLogo.jpg"

export default function RatingBlock({ratings, generalRating}) {

    const {ratingKinopoisk = 0, ratingImdb = 0,  ratingTmdb = 0} = ratings || {};

    return (
        <div className="flex flex-col space-y-4 p-4 border border-[#2D2A4A] rounded-lg bg-[#121212]/30 w-full lg:w-48">

            {/*<RatingItem*/}
            {/*    iconUrl={viewFlowLogo}*/}
            {/*    label="ViewFlow"*/}
            {/*    value={viewflowRating}*/}
            {/*/>*/}

            { generalRating > 0 && (
                <RatingItem
                    iconUrl={viewFlowLogo}
                    label="Общий рейтинг"
                    value={generalRating}
                />
            )}

            { ratingImdb > 0 && (
                <RatingItem
                    iconUrl={IMDBLogo}
                    label="IMDb"
                    value={ratingImdb}
                />
            )}

            { ratingKinopoisk > 0 && (
                <RatingItem
                    iconUrl={kinopoiskLogo}
                    label="Кинопоиск"
                    value={ratingKinopoisk}
                />
            )}

            { ratingTmdb > 0 && (
                <RatingItem
                    iconUrl={tmdbLogo}
                    label="TMDB"
                    value={ratingTmdb}
                />
            )}

            {/*<RatingItem*/}
            {/*    iconUrl={rottenLogo}*/}
            {/*    label="Rotten Tomatoes"*/}
            {/*    value={`${rotten}%`}*/}
            {/*/>*/}
        </div>
    )
}


function RatingItem({iconUrl, label, value}) {
    return (
        <div className="flex items-center gap-3">
            <div
                className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-md border border-gray-700/50">
                <img src={iconUrl} alt={label} className="w-full h-full object-cover"/>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">{value}</span>
                <span className="text-xs text-[#A6A4B0] leading-tight">{label}</span>
            </div>
        </div>
    )
}