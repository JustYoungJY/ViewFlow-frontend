import Header from './components/Layout/Header.jsx'
import Footer from "./components/Layout/Footer.jsx";
import {Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx"
import CatalogPage from "./pages/CatalogPage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import CompilationsPage from "./pages/CompilationsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CompilationPage from "./pages/SelectionPage.jsx";
import {useEffect} from "react";
import {setupInterceptors} from "./api/axiosInstance.js";
import {useToast} from "./context/ToastContext.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

// Go to hash
function ScrollToHash() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return null;
}


function App() {

    const { showToast } = useToast();

    useEffect(() => {
        setupInterceptors(showToast);
    }, [showToast]);

    return (
        <>
            <Header />
            <ScrollToHash />
            <main className="pt-16">
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/catalog" element={<CatalogPage />}></Route>
                    <Route path="/movie/:id" element={<MoviePage />} />
                    <Route path="/compilations" element={<CompilationsPage />}></Route>
                    <Route path="/profile/:username" element={<ProfilePage />}></Route>
                    <Route path="/compilation/:id" element={<CompilationPage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    {/*<Route path="PrivacyPolicy" element={<PrivacyPolicy />}></Route>*/}
                    {/*<Route path="*" element={<NotFoundPage />}></Route>*/}
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
