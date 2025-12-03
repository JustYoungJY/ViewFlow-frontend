



export default function SearchResultsDropdown ({ searchResults, dropdownRef, handleSelectMedia }) {
    // Interleave movies and TV shows
    const movies = searchResults.filter(item => item.mediaType === 'MOVIE');
    const tvShows = searchResults.filter(item => item.mediaType === 'TV');
    const maxItems = Math.max(movies.length, tvShows.length);
    const interleavedResults = [];

    for (let i = 0; i < maxItems; i++) {
        if (i < movies.length) interleavedResults.push(movies[i]);
        if (i < tvShows.length) interleavedResults.push(tvShows[i]);
    }

    return (
        <div
            ref={dropdownRef}
            className="absolute z-10 mt-1 w-full bg-[#1a162c] border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scrollbar"
        >
            <div className="p-2 space-y-1">
                {interleavedResults.map((item) => (
                    <div
                        key={`${item.mediaType}-${item.mediaId}`}
                        onClick={() => handleSelectMedia(item)}
                        className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                    >
                        {item.posterUrl && (
                            <img
                                src={`https://image.tmdb.org/t/p/w92${item.posterUrl}`}
                                alt={item.title}
                                className="w-10 h-14 object-cover rounded"
                            />
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="text-white text-sm font-medium truncate">{item.title}</div>
                            <div className="text-gray-400 text-xs flex items-center gap-1">
                                <span>{item.releaseYear}</span>
                                <span>•</span>
                                <span>{item.mediaType === 'MOVIE' ? '🎬 Фильм' : '📺 Сериал'}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};