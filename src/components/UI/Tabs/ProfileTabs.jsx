const TABS = ['Мои подборки', 'Избранное', 'Просмотренное', 'Активность'];

export default function ProfileTabs({activeTab, onTabClick}) {
    return (
        <div className="w-full mt-10">
            <div className="flex border-b border-[#2D2A4A] px-4 gap-8">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => onTabClick(tab)}
                        className={`flex flex-col items-center justify-center pb-[13px] pt-4 text-sm font-bold transition-colors
                            ${activeTab === tab
                            ? 'text-white gradient-border-bottom' // Активная вкладка
                            : 'text-[#9CA3AF] border-b-2 border-b-transparent hover:text-white' // Неактивная
                        }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}