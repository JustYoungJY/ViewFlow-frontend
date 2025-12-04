import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useToast } from "../context/ToastContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import instance from "../api/axiosInstance.js";

import Comment from '../components/UI/Comment/Comment.jsx';
import SelectionHeader from "../components/Content/Headers/SelectionHeader.jsx";
import SelectionDetails from "../components/Content/SelectionDetails.jsx";
import CompilationMovieItem from "../components/UI/Items/SelectionMovieItem.jsx";

import EditCompilationModal from '../components/UI/Modals/EditCompilationModal.jsx';
import EditMediaModal from '../components/UI/Modals/EditMediaModal.jsx';
import AddMediaModal from '../components/UI/Modals/AddMediaModal.jsx';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const YOUTUBE_TRAILER_BASE = "https://www.youtube.com/embed/"

export default function SelectionPage() {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const { showToast } = useToast();

    const [compilation, setCompilation] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isEditCompModalOpen, setEditCompModalOpen] = useState(false);
    const [isAddMediaOpen, setAddMediaOpen] = useState(false);
    const [editingMediaItem, setEditingMediaItem] = useState(null);

    const [commentText, setCommentText] = useState("");
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
    const [comments, setComments] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchCompilation = async () => {
        setIsLoading(true);
        try {
            const response = await instance.get(`/compilations/${id}`);
            const data = response.data;

            const processedMedia = (data.media || [])
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map(item => ({
                    ...item,
                    mediaDetails: {
                        ...item.mediaDetails,
                        posterUrl: item.mediaDetails.posterPath
                            ? (item.mediaDetails.posterPath.startsWith('http')
                                ? item.mediaDetails.posterPath
                                : `${TMDB_IMAGE_BASE}${item.mediaDetails.posterPath}`)
                            : null,
                        // Преобразуем массив режиссеров в строку
                        director: Array.isArray(item.mediaDetails.directors)
                            ? item.mediaDetails.directors.join(', ')
                            : item.mediaDetails.director
                    }
                }));

            setCompilation(data);
            setMediaList(processedMedia);
            setError(null);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchComments = async (page = 0) => {
        const response = await instance.get(`/comments/compilations/${id}`, {
            params: {
                page: page,
                size: 5,
                sort: "createdAt,desc"
            }
        });

        const data = response.data;

        setComments(data.content);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);
    };

    const compilationStats = useMemo(() => {
        if (!mediaList.length) return { duration: 0, rating: 0 };

        const totalMinutes = mediaList.reduce((acc, item) => acc + (item.mediaDetails.runtime || 0), 0);
        const totalRating = mediaList.reduce((acc, item) => acc + (item.mediaDetails.voteAverage || 0), 0);

        return {
            duration: totalMinutes, // В минутах
            rating: (totalRating / mediaList.length).toFixed(1)
        };
    }, [mediaList]);


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) {
            showToast("Текст комментария не может быть пустым", "error");
            return;
        }
        if (!currentUser) {
            showToast("Необходимо войти в систему, чтобы оставить комментарий", "error");
            return;
        }

        setIsCommentSubmitting(true);
        try {
            await instance.post(`/comments/compilations`, { 
                compilationId: Number(id),
                content: commentText.trim() 
            });
            setCommentText("");
            fetchComments(0);
        } finally {
            setIsCommentSubmitting(false);
        }
    };

    useEffect(() => {
        fetchCompilation();
    }, [id]);

    useEffect(() => {
        if(id) {
            fetchComments(currentPage);
        }
    }, [id, currentPage]);

    const onDragEnd = async (result) => {
        if (!result.destination || result.source.index === result.destination.index) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const newMediaList = Array.from(mediaList);
        const [reorderedItem] = newMediaList.splice(sourceIndex, 1);
        newMediaList.splice(destinationIndex, 0, reorderedItem);

        const updatedList = newMediaList.map((item, index) => ({
            ...item,
            orderIndex: index
        }));
        setMediaList(updatedList);

        try {
            await instance.patch(`/compilations/${id}/media`, {
                mediaId: reorderedItem.mediaId,
                mediaType: reorderedItem.mediaType,
                orderIndex: destinationIndex
            });
        } catch {
            fetchCompilation();
        }
    };

    if (isLoading) {
        return (
            <div className="bg-[#0F0A1F] min-h-screen flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B7FFF]"></div>
            </div>
        );
    }

    if (error || !compilation) {
        return (
            <div className="bg-[#0F0A1F] min-h-screen flex items-center justify-center text-white text-xl">
                {error || "Подборка не найдена"}
            </div>
        );
    }

    const isOwner = currentUser?.id === compilation.viewerId;

    return (
        <div className="bg-[#0F0A1F] min-h-screen pb-20">
            {/* Header */}
            <div className="relative group">
                <SelectionHeader
                    title={compilation.title}
                    imageUrl={compilation.imageUrl}
                    tags={compilation.tags}
                    compilationId={id}
                    user={{
                        username: "Пользователь #" + compilation.viewerId,
                        avatarUrl: "https://via.placeholder.com/150"
                    }}
                />

                {isOwner && (
                    <div className="absolute top-5 right-4 md:right-10 z-20">
                        <button
                            onClick={() => setEditCompModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-[#5B7FFF] backdrop-blur-md rounded-lg text-white transition-all border border-white/10"
                        >
                            <span className="material-symbols-outlined text-lg">edit</span>
                            <span className="hidden sm:inline">Редактировать</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Details & Stats */}
            <div className="mt-20">
            <SelectionDetails
                description={compilation.description}
                stats={{
                    movieCount: mediaList.length,
                    likes: compilation.likesCount,
                    date: new Date(compilation.createdAt).toLocaleDateString('ru-RU', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    }),
                    totalDuration: compilationStats.duration,
                    avgRating: compilationStats.rating
                }}
            />
            </div>

            {/* Media List */}
            <main className="max-w-5xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Подборка</h2>

                    {isOwner && (
                        <button
                            onClick={() => setAddMediaOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] text-white font-medium hover:opacity-90 shadow-lg shadow-[#5B7FFF]/20 transition-transform hover:scale-105"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Добавить
                        </button>
                    )}
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="media-list">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex flex-col gap-6"
                            >
                                {mediaList.map((item, index) => (
                                    <Draggable
                                        key={`${item.mediaId}-${item.mediaType}`}
                                        draggableId={`${item.mediaId}-${item.mediaType}`}
                                        index={index}
                                        isDragDisabled={!isOwner}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                style={{ ...provided.draggableProps.style }}
                                                className={`rounded-xl transition-all border border-transparent 
                                                    ${snapshot.isDragging
                                                    ? 'bg-[#25203b] shadow-2xl border-[#5B7FFF] scale-[1.02] z-50 p-4'
                                                    : (index % 2 === 0 ? 'bg-[#1a162c] p-4 md:p-6' : 'bg-transparent p-4 md:p-6')
                                                }
                                                `}
                                            >
                                                <div className="flex gap-4">
                                                    {isOwner && (
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="flex flex-col justify-center text-gray-600 hover:text-[#5B7FFF] cursor-grab active:cursor-grabbing"
                                                            title="Перетащить"
                                                        >
                                                            <span className="material-symbols-outlined">drag_indicator</span>
                                                        </div>
                                                    )}

                                                    <div className="flex-1 min-w-0">
                                                        <CompilationMovieItem
                                                            movie={{
                                                                id: item.mediaId,
                                                                mediaType: item.mediaType,
                                                                title: item.mediaDetails.title,
                                                                posterUrl: item.mediaDetails.posterUrl,
                                                                year: item.mediaDetails.releaseYear,
                                                                duration: item.mediaDetails.runtime,
                                                                genres: item.mediaDetails.genres || [],
                                                                description: item.mediaDetails.overview,
                                                                trailerUrl: `${YOUTUBE_TRAILER_BASE}${item.mediaDetails.trailerYoutubeId}`,
                                                                details: {
                                                                    country: item.mediaDetails.country,
                                                                    director: item.mediaDetails.director,
                                                                    budget: item.mediaDetails.budget,
                                                                },
                                                                rating: item.mediaDetails.voteAverage
                                                            }}
                                                            authorNote={item.authorDescription}
                                                            isOwner={isOwner}
                                                            onEditClick={() => setEditingMediaItem(item)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {mediaList.length === 0 && (
                    <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-700 rounded-xl bg-[#1a162c]/30">
                        <p className="text-lg">В этой подборке пока нет фильмов.</p>
                        {isOwner && <p className="text-sm mt-2 text-[#5B7FFF]">Нажмите "Добавить", чтобы начать.</p>}
                    </div>
                )}
            </main>

            {/* Comments Section */}
            <section className="max-w-3xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-white mb-8">Комментарии</h2>
                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4 mb-12">
                    <textarea
                        className="w-full bg-[#1a162c] border border-[#2D2A4A] rounded-lg p-4 text-white placeholder-[#A6A4B0] focus:ring-[#5B7FFF] focus:border-[#5B7FFF] transition"
                        placeholder="Напишите ваш комментарий..."
                        rows="4"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={isCommentSubmitting}
                    ></textarea>
                    <button
                        type="submit"
                        disabled={isCommentSubmitting || !commentText.trim() || !currentUser}
                        className="w-full sm:w-auto px-6 py-2.5 font-bold text-white rounded-md bg-gradient-to-r from-[#5B7FFF] to-[#A259FF] hover:opacity-90 transition-opacity self-end disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {isCommentSubmitting && <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span>}
                        {!currentUser ? "Войдите, чтобы комментировать" : "Отправить"}
                    </button>
                </form>

                <div className="space-y-8">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Комментариев пока нет. Будьте первым!</p>
                    )}
                </div>

                {/* Pagination */}
                {comments.length > 0 && (
                    <div className="mt-10 flex justify-center space-x-2">
                        {/* Button backward */}
                        {currentPage > 0 && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="px-4 py-2 rounded-lg font-semibold bg-[#2D2A47] text-gray-300 hover:bg-[#5B7FFF] transition-colors"
                            >
                                Назад
                            </button>
                        )}

                        {/* Buttons with number */}
                        {(() => {
                            const maxVisiblePages = 5;
                            let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
                            let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

                            if (endPage - startPage < maxVisiblePages - 1) {
                                startPage = Math.max(0, endPage - maxVisiblePages + 1);
                            }

                            const pages = [];
                            for (let i = startPage; i <= endPage; i++) {
                                pages.push(
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                            currentPage === i
                                                ? 'bg-[#A259FF] text-white'
                                                : 'bg-[#2D2A47] text-gray-300 hover:bg-[#5B7FFF]'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            }
                            return pages;
                        })()}

                        {/* Button forward */}
                        {currentPage < totalPages - 1 && (
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="px-4 py-2 rounded-lg font-semibold bg-[#2D2A47] text-gray-300 hover:bg-[#5B7FFF] transition-colors"
                            >
                                Вперед
                            </button>
                        )}
                    </div>
                )}
            </section>

            {/* MODALS */}
            <EditCompilationModal
                isOpen={isEditCompModalOpen}
                onClose={() => setEditCompModalOpen(false)}
                compilation={compilation}
                onSuccess={fetchCompilation}
            />

            <AddMediaModal
                isOpen={isAddMediaOpen}
                onClose={() => setAddMediaOpen(false)}
                compilationId={id}
                currentCount={mediaList.length}
                onSuccess={fetchCompilation}
            />

            {editingMediaItem && (
                <EditMediaModal
                    isOpen={!!editingMediaItem}
                    onClose={() => setEditingMediaItem(null)}
                    mediaItem={editingMediaItem}
                    compilationId={id}
                    onSuccess={fetchCompilation}
                />
            )}
        </div>
    );
}
