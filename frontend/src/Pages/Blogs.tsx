import { Link } from "react-router-dom";
import Appbar from "../Components/Appbar"
import Blog from "../Components/Blog"
import { useBlogs } from "../Hooks"
import BlogSkeleton from "../Components/BlogSkeleton";



const Blogs = () => {
    const { loading, blogs } = useBlogs();

    return (
        // className="flex flex-col h-screen 
        <div className="flex flex-col h-screen">
            <Appbar />
            <div className="flex justify-center overflow-y-auto overflow-x-hidden  ">
                <div className="max-w-2xl min-w-xs md:min-w-xl">
                    {/* <SkeletonsList /> */}
                    {loading ? <SkeletonsList /> : 
                        blogs.map((blogdata) =>
                            <Link to={`/blog/${blogdata.id}`} key={blogdata.id}>
                                <Blog authorName={blogdata.author.name} title={blogdata.title} content={blogdata.content} publishedDate="2 Nov 1992" />
                            </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

function SkeletonsList() {
    let sample = [1, 2, 3, 4, 5, 6, 7, 8];
    return <div className="">
        {sample.map(() =>
            <BlogSkeleton />
        )
        }
    </div>
}



export default Blogs
