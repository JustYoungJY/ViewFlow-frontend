import {Link} from "react-router-dom";


export default function NavLink({to, label}) {
    const isAnchor = to.startsWith("#");

    if (isAnchor) {
        return (
            <li className="hover:text-[#5B7FFF] transition">
                <a href={to}>
                    {label}
                </a>
            </li>
        )
    }

    return (
        <li className="hover:text-[#5B7FFF] transition">
            <Link to={to}>
                {label}
            </Link>
        </li>
    )
}
