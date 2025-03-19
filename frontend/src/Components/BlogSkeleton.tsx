
const BlogSkeleton = () => {
    return (
        <div role="status" className="max-w-lg animate-pulse">
            <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-200 mb-4 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="h-2 bg-gray-200 rounded-full w-48 mb-4"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded-full max-w-[360px] mb-2"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default BlogSkeleton
