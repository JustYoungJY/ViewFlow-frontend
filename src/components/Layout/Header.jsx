import NavLink from "../UI/Buttons/NavLink.jsx";
import AuthButton from "../UI/Buttons/AuthButton.jsx";


export default function Header() {
    const navItems = [
        {id: 1, path: "/", label: "Главная"},
        {id: 2, path: "/catalog", label: "Каталог"},
        {id: 3, path: "/compilations", label: "Подборки"},
        {id: 4, path: "/#randomizer-section", label: "Рандом"}
    ]

    return (
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
                <ul className="flex items-center gap-3 ml-3">
                    <AuthButton
                        className="vf-cta px-5 py-2 text-[18px] font-montserrat font-semibold focus:outline-none"
                        onClick="" variant="primary">Регистрация</AuthButton>
                    <AuthButton
                        className="vf-glass px-5 py-2 text-[18px] font-montserrat font-semibold text-[#5B7FFF] hover:text-[#A259FF] transition focus:outline-none"
                        onClick="" variant="secondary">Войти</AuthButton>
                </ul>
            </nav>
        </header>
    )
}
