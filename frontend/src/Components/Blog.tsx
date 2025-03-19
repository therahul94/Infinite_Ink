import { Link } from "react-router-dom"
import { Avatar } from "./Avatar";
import DOMPurify from 'dompurify';
import "quill/dist/quill.snow.css";

interface blogDetailsTypes {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
function Blog({ authorName, title, content, publishedDate }: blogDetailsTypes) {
    return (
        <div className="p-5">
            <div className="cursor-pointer">
                <div className="flex items-center ">
                    <div><Avatar author={authorName} size="small" /></div>
                    <Link to={"/blogs"} className="text-sm font-normal ml-2 hover:underline">
                        {authorName}
                    </Link>
                </div>
                <div className="font-extrabold text-xl md:text-2xl mt-4 mb-2.5">
                    {title}
                </div>
                <div >
                    <div className={`text-gray-600 text-sm md:text-base font-medium line-clamp-3`} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                </div>
                <div className="mt-2 flex ">
                    <div className="flex items-center">
                        <div>
                            <img src="/calendar.svg" alt="" className="h-4 w-4" />
                        </div>
                        <div className="text-gray-500 text-sm font-medium mx-2">{publishedDate}</div>
                    </div>
                    <div className="flex items-center">

                        <div className="text-xs text-gray-500">&#9679;</div>
                        <div className="text-gray-500 text-sm font-medium ml-2">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
                    </div>
                </div>
            </div>
            <hr className="mt-4 text-gray-300" />
        </div>
    )
}



export default Blog
