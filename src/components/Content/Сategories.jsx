import CategoryCard from "../UI/Cards/CategoryCard.jsx";


export default function Categories() {
    const DATA_CATEGORIES = [
        {
            id: 1,
            title: "Драма",
            description: "Трогающий жанр",
            iconUrl: "src/assets/free-icon-drama-2699435.png",
            linkUrl: "/categories/drama"
        },
        {
            id: 2,
            title: "Драма и триллер",
            description: "Трогающий за попу триллер",
            iconUrl: "asdasdas",
            linkUrl: "/categories/drama"
        },
        {
            id: 3,
            title: "Драма",
            description: "Трогающий жанр",
            iconUrl: "asdasdas",
            linkUrl: "/categories/drama"
        },
        {
            id: 4,
            title: "Драма",
            description: "Трогающий жанр",
            iconUrl: "asdasdas",
            linkUrl: "/categories/drama"
        },
        {
            id: 5,
            title: "Драма",
            description: "Трогающий жанр",
            iconUrl: "asdasdas",
            linkUrl: "/categories/drama"
        }, {
            id: 6,
            title: "Драма",
            description: "Трогающий жанр",
            iconUrl: "asdasdas",
            linkUrl: "/categories/drama"
        }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-10">
            {DATA_CATEGORIES.map((category) => (
                <CategoryCard
                    key={category.id}
                    title={category.title}
                    description={category.description}
                    iconUrl={category.iconUrl}
                    linkUrl={category.linkUrl}
                />
            ))}
        </div>
    )
}