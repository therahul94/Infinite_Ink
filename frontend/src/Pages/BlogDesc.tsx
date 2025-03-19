import Appbar from '../Components/Appbar';
import { Avatar } from '../Components/Avatar';
import { useBlog } from '../Hooks'
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import "quill/dist/quill.snow.css";
import BlogDescSkeleton from '../Components/BlogDescSkeleton';

const BlogDesc = () => {
  const { id } = useParams();
  const { loading, blogDetails } = useBlog({ id: id + "" });

  return (
    <div className='flex flex-col h-screen'>
      <Appbar />
      <div className='overflow-y-auto overflow-x-hidden py-5 px-5'>
        <div className='flex justify-center '>
          <div className='max-w-2xl  md:min-w-xl px-5 py-2'>
            {loading ?
              <div>
                <BlogDescSkeleton />
              </div>
              :
              <div>
                <div className='md:text-4xl font-extrabold flex justify-center text-2xl'>{blogDetails.title}</div>
                <div className='mt-5 md:mt-7 text-sm md:text-base py-2 text-gray-800'>
                  <div className='ql-editor' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetails.content) }} />
                </div>
                <div className='max-w-2xl flex items-center py-2'>
                  <Avatar author={blogDetails.author.name} size="big" />
                  <div className='ml-5'>
                    <div className='font-semibold text-base md:text-lg'>
                      Written by {blogDetails.author.name}
                    </div>
                    <div className='font-light text-sm text-gray-500'>
                      Posted on 2 December 2025
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogDesc
