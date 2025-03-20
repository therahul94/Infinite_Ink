import { Link, useNavigate } from "react-router-dom"
import AuthButton from "../Components/AuthButton"


const Landing = () => {
    return (
        <div>
            <LandingHeader />
            <LandingBody />
            <LandingFooter />
        </div>
    )
}


function LandingHeader() {
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 w-full h-8 md:h-12 py-7 md:py-8  bg-white border-b border-b-gray-300 flex flex-col justify-center">
            <div className="px-3 md:px-7 grid grid-cols-2">
                <Link to="/" className="flex justify-start items-center ">
                    <img src="/pencil.svg" alt="" className="w-5 h-5" />
                    <div className="text-lg md:text-2xl font-bold font-serif ml-1.5">
                        Infinite Ink</div></Link>
                <div className="flex justify-end">
                    <AuthButton buttonVal="Signin" onClick={() => navigate("/signin")} />
                </div>
            </div>
        </div>
    )
}

function LandingBody() {
    const navigate = useNavigate();
    function handleNavigation() {
        localStorage.getItem('token') ? navigate("blogs") : navigate("signin");
    }    
    return <div className="flex justify-center items-center h-dvh">
        <div>
            <div className="">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Where Words Flow Endlessly
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    Dive into a world of thoughtful articles, stories, and insights. Infinite Ink is your source for
                    engaging content that matters.
                </p>
            </div>
            <div className="mt-5">
                <button type="button" onClick={handleNavigation} className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    Start Reading
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
}

function LandingFooter() {
    return (
        <div className="fixed bottom-0 h-8 md:h-12 py-7 md:py-8 bg-white w-full border-t border-t-gray-300 flex justify-center items-center text-xs md:text-sm">
            © {new Date().getFullYear()} Infinite Ink. All rights are reserved
        </div>
    )
}

export default Landing
