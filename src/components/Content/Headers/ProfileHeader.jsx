export default function ProfileHeader({user, stats}) {
    return (
        <section className="flex flex-col gap-6 p-4 md:flex-row md:items-center">
            {/* Avatar and name (for mobile) */}
            <div className="flex flex-none items-center gap-6">
                <img
                    className="h-32 w-32 min-w-[128px] rounded-full border-2 border-white object-cover"
                    src={user.avatarUrl}
                    alt={user.username}
                />
                <div className="flex flex-col gap-3 md:hidden">
                    <h1 className="text-white text-[28px] font-bold">{user.username}</h1>
                    <button
                        className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full h-10 px-4 text-white text-sm font-semibold gradient-bg shadow-lg shadow-black/30 hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined text-lg">edit</span>
                        <span className="truncate">Редактировать</span>
                    </button>
                </div>
            </div>

            {/* Name for PC */}
            <div className="flex w-full flex-col gap-6">
                <div className="hidden flex-col gap-3 md:flex">
                    <h1 className="text-white text-[28px] font-bold">{user.username}</h1>
                    <button
                        className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full h-10 px-4 text-white text-sm font-semibold gradient-bg shadow-lg shadow-black/30 hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined text-lg">edit</span>
                        <span className="truncate">Редактировать профиль</span>
                    </button>
                </div>

                {/* Statistics blocks */}
                <div className="flex flex-wrap gap-6">
                    <StatBox icon="thumb_up" value={stats.likes} label="Лайков получено"/>
                    <StatBox icon="folder" value={stats.compilations} label="Подборок создано"/>
                    <StatBox icon="movie" value={stats.watched} label="Фильмов просмотрено"/>
                </div>
            </div>
        </section>
    );
}


function StatBox({icon, value, label}) {
    return (
        <div
            className="flex w-full min-w-[180px] flex-1 flex-col items-center justify-center gap-2 rounded-xl p-4 bg-[#1A162C] h-[90px] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <span className="material-symbols-outlined text-3xl gradient-text">{icon}</span>
            <p className="text-white text-base font-bold leading-normal">{value}</p>
            <p className="text-[#9CA3AF] text-xs font-medium leading-normal">{label}</p>
        </div>
    );
}