import CategoryCard from "../UI/Cards/CategoryCard.jsx";
import {useEffect, useState} from "react";
import instance from "../../api/axiosInstance.js";


export default function Categories() {

    const [categories, setCategories] = useState(null);

    useEffect(() => {

        const fetchCategories = async () => {

            const response = await instance.get("/categories");
            const data = response.data;

            setCategories(data)
        }

        fetchCategories();
    }, [])

    if (categories === null) {
        return <div className="mt-10 text-[#A6A4B0]">Загрузка категорий...</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    title={category.name}
                    description={category.description}
                    iconUrl={category.iconUrl}
                    linkUrl={`/category/${category.id}`}
                />
            ))}
        </div>
    )
}