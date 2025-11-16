export default function WatchOptions() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-900 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4">Легально</h3>
                <a href="https://netflix.com" className="block mb-2 text-blue-300 hover:underline">Netflix</a>
                <a href="https://kinopoisk.ru" className="block mb-2 text-blue-300 hover:underline">Кинопоиск HD</a>
                <a href="https://ivi.ru" className="block text-blue-300 hover:underline">IVI</a>
            </div>
            <div className="bg-orange-900 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4">Нелегально</h3>
                <a href="https://hdrezka.ag" className="block mb-2 text-blue-300 hover:underline">HDRezka</a>
                <a href="https://lordfilm.tv" className="block text-blue-300 hover:underline">LordFilm</a>
            </div>
            <div className="bg-purple-900 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4">Торренты</h3>
                <a href="https://rutracker.org" className="block mb-2 text-blue-300 hover:underline">Rutracker</a>
                <a href="https://1337x.to" className="block text-blue-300 hover:underline">1337x</a>
            </div>
        </div>
    );
}