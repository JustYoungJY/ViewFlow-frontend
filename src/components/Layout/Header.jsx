import NavLink from "../UI/Buttons/NavLink.jsx";
import AuthButton from "../UI/Buttons/AuthButton.jsx";
import AuthModal from "../Content/AuthModal.jsx";
import {useState} from "react";


export default function Header() {
    const navItems = [
        {id: 1, path: "/", label: "Главная"},
        {id: 2, path: "/catalog", label: "Каталог"},
        {id: 3, path: "/compilations", label: "Подборки"},
        {id: 4, path: "/#randomizer-section", label: "Рандом"}
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");

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

    return (

        <>
        <header
            className="fixed top-0 left-0 w-full h-16 z-30 bg-[rgba(25,24,37,0.92)] backdrop-blur-md shadow-md transition-all duration-150">
            <nav className="max-w-[1240px] mx-auto flex items-center justify-between px-4 py-0">
                <img src="/logo.png" alt="logo" className="h-16 w-16 object-contain flex-shrink-0"></img>

                <ul className="hidden md:flex items-center gap-8 ml-8 text-[18px] font-medium text-[#A6A4B0]">
                    {navItems.map(item => (
                            <NavLink key={item.id} to={item.path} label={item.label}/>
                        )
                    )}
                </ul>
                <AuthButton
                    onLoginClick={openLogin}
                    onRegisterClick={openRegister}
                />
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
