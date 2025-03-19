import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

const Appbar = ({ publishpage }: { publishpage?: boolean }) => {
    return (
        <div className=" w-full h-8 md:h-12 py-7 md:py-8  bg-white border-b-2 border-b-gray-300 flex flex-col justify-center">
            <div className="px-3 md:px-7 grid grid-cols-2">
                <Link to="/blogs" className="text-lg md:text-2xl font-bold flex flex-col justify-center font-serif">Infinite Ink</Link>
                <div className="flex justify-end items-center">
                    {publishpage ?
                        <></>
                        :
                        <Link to={"/publishblog"} className="flex items-center  text-lg">
                            <div className="w-5 h-5 ">
                                <img src="/write.svg" alt="no-image" className="" />
                            </div>
                            <div className="font-light text-gray-700 ml-1 ">Write</div>
                        </Link>
                    }
                    <div className="cursor-pointer ml-4 md:ml-7">
                        <Avatar author="Jessica Stillmen" size="big" />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Appbar
