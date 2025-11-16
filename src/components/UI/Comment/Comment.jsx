export default function Comment({avatar, username, text}) {
    return (
        <div className="flex items-start gap-4">
            <img
                className="w-12 h-12 rounded-full bg-center bg-cover flex-shrink-0 border-2 border-[#2D2A4A]"
                src={avatar}
                alt="avatar"
            />
            <div className="flex flex-col">
                <p className="font-bold text-white text-lg">{username}</p>
                <p className="text-[#A6A4B0] text-base mt-1">{text}</p>
            </div>
        </div>
    );
}