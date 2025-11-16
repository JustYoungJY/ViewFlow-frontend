import {useMemo, useState} from 'react';

import CompilationCard from '../components/UI/Cards/CompilationCard.jsx';
import CompilationSort from '../components/UI/Filter/CompilationSort.jsx';
import SelectedFilters from '../components/UI/Filter/SelectedFilters.jsx';

// dummy
const dummyCollections = [
    {
        id: 1,
        title: "Фильмы Кристофера Нолана",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB39T5D6e_fTPig1i76E44ABGPuwHpRD1fOdwZi__fII21H2zLofIcN3NmF-6WKwsr0LlTP_Q9ykN3CLHKgm37jyD_a-hTvopYBSNTaQgZqlxpdFEnWjJuzW1P7kjpQm7q_OH4SO82Gs2nuKRNTBhX1Geuc8sWNb0TSRY1m-AoFW5Zx0TyemKgbQZP6LcM8FSpIFBfTqkKTqmpgUvrppGyhv9ZPQtWi6L6A7u6qyYpBC7_NdnLkJvKmEMPksPm8OG8_eHeAlu7SilaP",
        user: { username: "nolan_fan", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL6cZFENCgBxOVdy_lKfypHy594DLfS_2MPjZQfLPoQLUy9bCeEQj9TEc3cii8Cr4PGB7Vsq6j-L6US-iU2iMkH8o9VA4QSAPp6KfnJdL6PIZWaapvxR52BacGTKf1BNjDY95NvkpTCt0KZvJLTK_k1Q01er7NltwkahIPiH4pD6T8P0DJll02tQizfQAjRSZJ0Y_eQEyHMzpRR0uLaIJ8KZ4hr79w6-zgqLBIbEf3MfWPeU6g64i6cRed87axdXcfAoagX3I9YjO3" },
        movieCount: 12,
        likes: 342,
        tags: ["#Фантастика", "#Драма", "#Культовое"],
    },
    {
        id: 2,
        title: "Лучшие комедии 2000-х",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVarADFToGYniPBqa99rJ410Jznd5AZIOz6fm7zrWpaQetDj9LNOF_B-iOpygWQ-OVuGFJcOQ2skvBCgYQR0nASb9KV3ERs-sxyo9RV8xE9jL2X86xrItvfv80oG5FDDJbvEBgg3juqglcaUXJm0hU9Fu-3misyIQ4CMWzzVhO2MKxNA30OUhTtQfSjkDuVqwqR1jCc0PSxEyq70dE1BGKGFS06u5MdmfY-gXsjMZz9wqKtLb3NvzpyPtBEi83gFNx6qUeh9rHNjs1",
        user: { username: "comedy_lover", avatarUrl: "https://i.pravatar.cc/150?img=2" },
        movieCount: 25,
        likes: 1100,
        tags: ["#Комедия", "#2000е"],
    },
    {
        id: 3,
        title: "Азиатские хорроры",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYPkOAj9PSqCrkI34vbCQqYsR48LSwAkStY1HTBFrRNjDH5xRXLp1GRP-65grG8Vr4lC-MSf-jAyC9ZaI3ED0VAbb79705tYWlnXWm2MEq8X7Ld7VF0snd6cQ3B69u8igQrzYczeodWZPgB1HwPmP6D4cBL-mJ5hoUjOM3aoYSgu1Rx3uHEGGoZiOPrl-2YATnljzZu8xs5z2Tm18yMrv-J0xztFMvWCP4OQg5wHyFaR6nAu3L0cW_gi6Dwi7M-DcgMVVtG9tWtv46",
        user: { username: "horror_fanatic", avatarUrl: "https://i.pravatar.cc/150?img=3" },
        movieCount: 18,
        likes: 876,
        tags: ["#Хоррор", "#Азия", "#Саспенс"],
    },
    {
        id: 4,
        title: "Волшебный мир Хаяо Миядзаки",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqQJn6Gfgt-ympZNoWnwvbeiZucq5ahX4rvoEZhY7W8IXzPuFbrOs2nAItqVc-1msdaCW9V6ShnVQfq-3Uu32Q2Mwe4f-XaShFYSQ1MGPaL-q8q7E2p22n1bFWzFY6CLCmgdnsy1lWUlQF_EA5WK6sMcxzl72YSrqdurupYBGkyt3-YCLfn45hUua327FNIaa2bFUGpE8_17KEe4coFfu2BP87RyTZD1s4SQQRi4xApBkoDUAs1U0iAwAR0A5hb_gbIQzQJrfmQIZM",
        user: { username: "ghibli_dreamer", avatarUrl: "https://i.pravatar.cc/150?img=4" },
        movieCount: 11,
        likes: 2300,
        tags: ["#Аниме", "#Фэнтези", "#Ghibli"],
    },
    {
        id: 5,
        title: "Все фильмы Тарантино",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYPkOAj9PSqCrkI34vbCQqYsR48LSwAkStY1HTBFrRNjDH5xRXLp1GRP-65grG8Vr4lC-MSf-jAyC9ZaI3ED0VAbb79705tYWlnXWm2MEq8X7Ld7VF0snd6cQ3B69u8igQrzYczeodWZPgB1HwPmP6D4cBL-mJ5hoUjOM3aoYSgu1Rx3uHEGGoZiOPrl-2YATnljzZu8xs5z2Tm18yMrv-J0xztFMvWCP4OQg5wHyFaR6nAu3L0cW_gi6Dwi7M-DcgMVVtG9tWtv46",
        user: { username: "tarantino_fan", avatarUrl: "https://i.pravatar.cc/150?img=5" },
        movieCount: 9,
        likes: 980,
        tags: ["#Криминал", "#Диалоги"],
    },
    {
        id: 6,
        title: "Классика нуара",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB39T5D6e_fTPig1i76E44ABGPuwHpRD1fOdwZi__fII21H2zLofIcN3NmF-6WKwsr0LlTP_Q9ykN3CLHKgm37jyD_a-hTvopYBSNTaQgZqlxpdFEnWjJuzW1P7kjpQm7q_OH4SO82Gs2nuKRNTBhX1Geuc8sWNb0TSRY1m-AoFW5Zx0TyemKgbQZP6LcM8FSpIFBfTqkKTqmpgUvrppGyhv9ZPQtWi6L6A7u6qyYpBC7_NdnLkJvKmEMPksPm8OG8_eHeAlu7SilaP",
        user: { username: "noir_cinephile", avatarUrl: "https://i.pravatar.cc/150?img=6" },
        movieCount: 30,
        likes: 512,
        tags: ["#Нуар", "#Детектив", "#ЧБ"],
    },
    {
        id: 7,
        title: "Фильмы Кристофера Нолана",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB39T5D6e_fTPig1i76E44ABGPuwHpRD1fOdwZi__fII21H2zLofIcN3NmF-6WKwsr0LlTP_Q9ykN3CLHKgm37jyD_a-hTvopYBSNTaQgZqlxpdFEnWjJuzW1P7kjpQm7q_OH4SO82Gs2nuKRNTBhX1Geuc8sWNb0TSRY1m-AoFW5Zx0TyemKgbQZP6LcM8FSpIFBfTqkKTqmpgUvrppGyhv9ZPQtWi6L6A7u6qyYpBC7_NdnLkJvKmEMPksPm8OG8_eHeAlu7SilaP",
        user: { username: "nolan_fan", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL6cZFENCgBxOVdy_lKfypHy594DLfS_2MPjZQfLPoQLUy9bCeEQj9TEc3cii8Cr4PGB7Vsq6j-L6US-iU2iMkH8o9VA4QSAPp6KfnJdL6PIZWaapvxR52BacGTKf1BNjDY95NvkpTCt0KZvJLTK_k1Q01er7NltwkahIPiH4pD6T8P0DJll02tQizfQAjRSZJ0Y_eQEyHMzpRR0uLaIJ8KZ4hr79w6-zgqLBIbEf3MfWPeU6g64i6cRed87axdXcfAoagX3I9YjO3" },
        movieCount: 12,
        likes: 342,
        tags: ["#Фантастика", "#Драма", "#Культовое"],
    },
    {
        id: 8,
        title: "Лучшие комедии 2000-х",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVarADFToGYniPBqa99rJ410Jznd5AZIOz6fm7zrWpaQetDj9LNOF_B-iOpygWQ-OVuGFJcOQ2skvBCgYQR0nASb9KV3ERs-sxyo9RV8xE9jL2X86xrItvfv80oG5FDDJbvEBgg3juqglcaUXJm0hU9Fu-3misyIQ4CMWzzVhO2MKxNA30OUhTtQfSjkDuVqwqR1jCc0PSxEyq70dE1BGKGFS06u5MdmfY-gXsjMZz9wqKtLb3NvzpyPtBEi83gFNx6qUeh9rHNjs1",
        user: { username: "comedy_lover", avatarUrl: "https://i.pravatar.cc/150?img=2" },
        movieCount: 25,
        likes: 1100,
        tags: ["#Комедия", "#2000е"],
    },
    {
        id: 9,
        title: "Азиатские хорроры",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYPkOAj9PSqCrkI34vbCQqYsR48LSwAkStY1HTBFrRNjDH5xRXLp1GRP-65grG8Vr4lC-MSf-jAyC9ZaI3ED0VAbb79705tYWlnXWm2MEq8X7Ld7VF0snd6cQ3B69u8igQrzYczeodWZPgB1HwPmP6D4cBL-mJ5hoUjOM3aoYSgu1Rx3uHEGGoZiOPrl-2YATnljzZu8xs5z2Tm18yMrv-J0xztFMvWCP4OQg5wHyFaR6nAu3L0cW_gi6Dwi7M-DcgMVVtG9tWtv46",
        user: { username: "horror_fanatic", avatarUrl: "https://i.pravatar.cc/150?img=3" },
        movieCount: 18,
        likes: 876,
        tags: ["#Хоррор", "#Азия", "#Саспенс"],
    }
];

//crutch
const predefinedHeights = [
    '400px',
    '500px',
    '450px',
    '550px',
    '420px',
    '580px',
    '480px',
    '520px',
    '460px',
    '600px'
];


export default function CompilationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [sortBy, setSortBy] = useState("popularity");
    const [sortDirection, setSortDirection] = useState("desc");


    const handleTagClick = (tag) => {
        if (!selectedFilters.includes(tag)) {
            setSelectedFilters([...selectedFilters, tag]);
        }
    };


    const handleRemoveFilter = (filterToRemove) => {
        setSelectedFilters(selectedFilters.filter(filter => filter !== filterToRemove));
    };

    // The filtering and sorting logic will be here.
    const displayedCollections = dummyCollections;

    const columns = useMemo(() => {
        const numColumns = 4;
        const columnArrays = Array.from({ length: numColumns }, () => []);

        displayedCollections.forEach((item, index) => {
            const height = predefinedHeights[index % predefinedHeights.length];
            columnArrays[index % numColumns].push({...item, height});
        });

        return columnArrays;
    }, [displayedCollections]);

    return (
        <div className="min-h-screen bg-[#0F0A1F] text-[#9CA3AF] px-6 py-8">
            <div className="max-w-screen-2xl mx-auto">

                <header className="mb-8 space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-12">
                        Подборки
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="relative flex-grow">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8d9bce] text-2xl">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Поиск по жанрам, фильмам, режиссёрам..."
                                className="w-full h-12 pl-12 pr-12 rounded-full text-white bg-[#1a162c] border-none focus:outline-0 focus:ring-2 focus:ring-[#5c7fff]/50"
                            />
                        </div>
                        <button className="flex-shrink-0 flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-[#5B7FFF] to-[#A259FF] text-white transition-transform duration-300 hover:scale-110">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 min-h-[2.5rem]">
                        <CompilationSort
                            sortBy={sortBy}
                            onSortByChange={setSortBy}
                            sortDirection={sortDirection}
                            onSortDirectionChange={setSortDirection}
                        />

                        <SelectedFilters
                            filters={selectedFilters}
                            onRemove={handleRemoveFilter}
                        />
                    </div>
                </header>

                {/* Grid */}
                <main>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {columns.map((column, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-6">
                                {column.map(collection => (
                                    <CompilationCard
                                        key={collection.id}
                                        collection={collection}
                                        onTagClick={handleTagClick}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}