import ContentCard from "../../UI/Cards/ContentCard.jsx";


export default function HorizontalSlider() {
    const CARDS_DATA = [
        {
            id: 1,
            title: "ABCsdfsdfsdfsdfsdfsdfsdfsfdsdfaaaaaaasfdl;jsjfdsjklfdjslfdjskfjlksndflksndfksdfslkfsfjhsjfhjskfhjskhfsfk",
            description: "ABCsdfsdfsdfsdfsfdsdfsdfsfdsfsaaaaaasdfsdfsdsdfsdfsfffffffdksjghaglsglksjfslkjfdlksjdfsdfsdkfdmslkdfmnslkdfnlsnflsknflksndfslkfnfdsjdfljs",
            linkUrl: "/compilations/ABC",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        },
        {
            id: 2,
            title: "DEF",
            description: "DEF",
            linkUrl: "/compilations/DEF",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        },
        {
            id: 3,
            title: "GHI",
            description: "GHI",
            linkUrl: "/compilations/GHI",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        },
        {
            id: 4,
            title: "GHI",
            description: "GHI",
            linkUrl: "/compilations/GHI",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        },
        {
            id: 5,
            title: "GHI",
            description: "GHI",
            linkUrl: "/compilations/GHI",
            backgroundUrl: "https://wallpaper.forfun.com/fetch/60/60f6eb528ccf3eb88adac465adb45cde.jpeg"
        }
    ]

    return (
        <div className="flex overflow-x-scroll space-x-4 pb-4 px-1 pt-4 custom-scrollbar">
            {CARDS_DATA.map((card) => (
                <ContentCard
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    linkUrl={card.linkUrl}
                    backgroundUrl={card.backgroundUrl}/>
            ))}
        </div>
    )


}