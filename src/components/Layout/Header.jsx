import NavLink from "../UI/Buttons/NavLink.jsx";
import AuthButton from "../UI/Buttons/AuthButton.jsx";
import AuthModal from "../Content/AuthModal.jsx";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import instance from "../../api/axiosInstance.js";


export default function Header() {
    const { currentUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        {id: 1, path: "/", label: "Главная"},
        {id: 2, path: "/catalog", label: "Каталог"},
        {id: 3, path: "/compilations", label: "Подборки"},
        {id: 4, path: "/#randomizer-section", label: "Рандом"}
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchRef = useRef(null);

    const openLogin = () => {
        setIsModalOpen(true);
        setAuthMode("login");
    }

    const openRegister = () => {
        setIsModalOpen(true);
        setAuthMode("register")
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const navigateToProfile = () => {
        if (currentUser && currentUser.username) {
            navigate(`/profile/${currentUser.username}`);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                try {
                    const response = await instance.get("/media/selection", {
                        params: { query: searchQuery }
                    });
                    setSearchResults(response.data);
                    setShowSearchDropdown(true);
                } catch (error) {
                    console.error("Search error:", error);
                }
            } else {
                setSearchResults([]);
                setShowSearchDropdown(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const movies = searchResults.filter(item => item.mediaType === "MOVIE");
    const series = searchResults.filter(item => item.mediaType === "TV");

    const handleResultClick = () => {
        setShowSearchDropdown(false);
        setSearchQuery("");
    }

    return (

        <>
        <header
            className="fixed top-0 left-0 w-full h-16 z-50 bg-[rgba(25,24,37,0.92)] backdrop-blur-md shadow-md transition-all duration-150">
            <nav className="max-w-[1240px] mx-auto flex items-center justify-between px-4 py-0">
                <img src="/logo.png" alt="logo" className="h-16 w-16 object-contain flex-shrink-0"></img>

                <ul className="hidden md:flex items-center gap-8 ml-8 text-[18px] font-medium text-[#A6A4B0]">
                    {navItems.map(item => (
                            <NavLink key={item.id} to={item.path} label={item.label}/>
                        )
                    )}
                </ul>

                <div className="flex-1 max-w-xs relative hidden md:block" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Поиск фильмов и сериалов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.length >= 2 && setShowSearchDropdown(true)}
                            className="w-full bg-[#2D2A4A] text-white text-sm rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5B7FFF] transition-all placeholder-gray-400"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                search
                            </span>
                    </div>

                    {/* Dropdown results */}
                    {showSearchDropdown && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-[#1F1D2B] border border-[#2D2A4A] rounded-xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto custom-scrollbar">

                            {/* Movies section */}
                            {movies.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Фильмы</h3>
                                    {movies.slice(0, 5).map(movie => (
                                        <Link
                                            key={movie.mediaId}
                                            to={`/movie/${movie.mediaId}`}
                                            onClick={handleResultClick}
                                            className="flex items-center gap-3 p-2 hover:bg-[#2D2A4A] rounded-lg transition-colors group"
                                        >
                                            <img
                                                src={movie.posterUrl ? `https://image.tmdb.org/t/p/w92${movie.posterUrl}` : "https://via.placeholder.com/45x68"}
                                                alt={movie.title}
                                                className="w-10 h-14 object-cover rounded shadow-md"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium text-sm group-hover:text-[#A259FF] transition-colors line-clamp-1">{movie.title}</span>
                                                <span className="text-gray-400 text-xs">{movie.releaseYear}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {movies.length > 0 && series.length > 0 && <div className="h-[1px] bg-[#2D2A4A] mx-2"></div>}

                            {/* Series section */}
                            {series.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Сериалы</h3>
                                    {series.slice(0, 5).map(show => (
                                        <Link
                                            key={show.mediaId}
                                            to={`/tv/${show.mediaId}`}
                                            onClick={handleResultClick}
                                            className="flex items-center gap-3 p-2 hover:bg-[#2D2A4A] rounded-lg transition-colors group"
                                        >
                                            <img
                                                src={show.posterUrl ? `https://image.tmdb.org/t/p/w92${show.posterUrl}` : "https://via.placeholder.com/45x68"}
                                                alt={show.title}
                                                className="w-10 h-14 object-cover rounded shadow-md"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium text-sm group-hover:text-[#A259FF] transition-colors line-clamp-1">{show.title}</span>
                                                <span className="text-gray-400 text-xs">{show.releaseYear}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                        </div>
                    )}

                    {/* No results state */}
                    {showSearchDropdown && searchResults.length === 0 && searchQuery.length >= 2 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-[#1F1D2B] border border-[#2D2A4A] rounded-xl shadow-xl p-4 text-center text-gray-400 text-sm">
                            Ничего не найдено
                        </div>
                    )}
                </div>

                {isAuthenticated ? (
                    <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={navigateToProfile}
                    >
                        <span className="text-white text-sm font-medium hidden sm:block">
                            {currentUser.username}
                        </span>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#5B7FFF] hover:border-[#A259FF] transition-all duration-300">
                            <img 
                                src={currentUser.avatarUrl || "/default-avatar.jpg"}
                                alt="User avatar" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ) : (
                    <AuthButton
                        onLoginClick={openLogin}
                        onRegisterClick={openRegister}
                    />
                )}
            </nav>
        </header>



        <AuthModal
            isOpen={isModalOpen}
            onClose={closeModal}
            initialMode={authMode}
        />
        </>
    )
}
