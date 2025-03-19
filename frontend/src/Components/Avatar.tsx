export function Avatar({ author, size }: { author: string, size: "big" | "small"}) {
    const authorArr = author.split(" ");
    if (authorArr.length >= 2)
        return (
            <div className={`inline-flex items-center justify-center ${size === "big" ? 'w-8 md:w-10 h-8 md:h-10': 'w-4 md:w-6 h-4 md:h-6'} overflow-hidden bg-slate-400 rounded-full`} >
                <span className="font-medium text-white text-xs">{authorArr[0][0].toUpperCase() + authorArr[1][0].toUpperCase()}</span>
            </div>
        )
    return (
        <div className={`inline-flex items-center justify-center ${size === "big" ? 'w-8 md:w-10 h-8 md:h-10': 'w-4 md:w-6 h-4 md:h-6'} overflow-hidden bg-slate-400 rounded-full `}>
            <span className="font-medium text-white text-xs">{authorArr[0][0].toUpperCase()}</span>
        </div>
    )
}