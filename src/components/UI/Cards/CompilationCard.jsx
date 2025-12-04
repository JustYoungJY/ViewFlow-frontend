import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import instance from '../../../api/axiosInstance.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function CompilationCard({collection, onTagClick}) {
    const {id, title, imageUrl, user, movieCount, tags, height} = collection;
    const [likes, setLikes] = useState(collection.likes);
    const [isLiked, setIsLiked] = useState(false);
    const { showToast } = useToast();

    // Check if compilation is liked
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await instance.get(`/compilations/${id}/status`);
                setIsLiked(response.data);
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        };

        checkLikeStatus();
    }, [id]);

    const handleLikeClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            // Toggle like status with POST request
            await instance.post(`/compilations/${id}/like`);

            // Update local state
            if (isLiked) {
                setLikes(prev => prev - 1);
                setIsLiked(false);
                showToast("Лайк удален", "success");
            } else {
                setLikes(prev => prev + 1);
                setIsLiked(true);
                showToast("Лайк добавлен", "success");
            }
        } catch (error) {
            console.error("Error toggling like status:", error);
            showToast("Ошибка при обновлении лайка", "error");
        }
    };

    const handleTagClickInternal = (e, tag) => {
        e.preventDefault();
        e.stopPropagation();
        onTagClick(tag);
    };

    return (
        <div
            className="masonry-item group relative overflow-hidden rounded-lg bg-[#1a162c] shadow-soft transition-all duration-300 hover:shadow-soft-hover hover:-translate-y-1 flex flex-col"
            style={{minHeight: height || "400px"}}
        >

            <Link to={`/compilation/${id}`} className="flex flex-col justify-end w-full h-full flex-1">

                <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageUrl}
                    alt={title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                <div className="relative p-6 text-white">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-black leading-tight">{title}</h2>

                        <Link
                            to={`/profile/${user.username}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 text-sm text-[#E5E7EB] w-fit hover:opacity-80"
                        >
                            <img
                                className="w-6 h-6 rounded-full border-2 border-white/50"
                                src={user.avatarUrl}
                                alt={user.username}
                            />
                            <span>{user.username}</span>
                        </Link>

                        <div className="flex items-center gap-4 text-sm text-[#E5E7EB]">
                            <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-lg">movie</span>
                                {movieCount} фильмов
                            </span>
                            <button
                                onClick={handleLikeClick}
                                className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-[#FF6B6B]' : 'text-[#E5E7EB] hover:text-[#FF6B6B]'}`}
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {isLiked ? 'favorite' : 'favorite_border'}
                                </span>
                                {likes}
                            </button>
                        </div>

                        <div className="flex gap-2 flex-wrap pt-2">
                            {tags.map(tag => (
                                <div
                                    key={tag.id}
                                    onClick={(e) => handleTagClickInternal(e, tag)}
                                    className="flex h-7 shrink-0 items-center justify-center rounded-full bg-[#4B5563] px-3 text-xs font-medium text-[#E5E7EB] cursor-pointer hover:bg-[#5B7FFF]"
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
