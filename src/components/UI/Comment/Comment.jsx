export default function Comment({comment}) {

    const {
        viewer,
        content,
        stars,
        createdAt
    } = comment;

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';



    return (
        <div className="bg-[#191825] p-5 rounded-xl shadow-lg border border-[#2D2A47] mt-10">
            <div className="flex items-start gap-4">
                <img
                    className="w-12 h-12 rounded-full bg-center bg-cover flex-shrink-0 border-2 border-[#2D2A4A]"
                    src={viewer.avatarUrl}
                    alt={viewer?.username || 'Пользователь'}
                />

                <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-white text-lg">{viewer?.username || 'Аноним'}</p>
                        {stars && stars > 0 && (
                            <div className="flex items-center text-yellow-400 text-xl">
                                {[...Array(stars)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                                <span className="ml-2 text-white text-base font-semibold">({stars}/10)</span>
                            </div>
                        )}
                    </div>

                    <p className="text-[#A6A4B0] text-base mt-2 whitespace-pre-wrap">{content}</p>

                    {formattedDate && (
                        <p className="text-gray-500 text-xs mt-3 self-end">
                            {formattedDate}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}