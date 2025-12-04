


export default function StarRating({ count, rating, onRating }) {
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