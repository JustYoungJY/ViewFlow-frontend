import NavLink from "../UI/Buttons/NavLink.jsx";

export default function Footer() {
    return (
        <footer className="w-full bg-[#23213A] border-t border-[#2D2A4A] pt-10 pb-6 px-4 visible">
            <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center md:justify-center gap-8">
                <ul className="flex items-center gap-8 text-[#A6A4B0] font-medium text-[16px]">
                    <NavLink to="/PrivacyPolicy" label="Privacy Policy"/>
                </ul>
            </div>
            <div className="text-center text-[#A6A4B0] mt-8 text-[15px]">© 2025 ViewFlow. Все права защищены.</div>
        </footer>
    )
}