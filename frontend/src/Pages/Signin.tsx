import { MouseEvent, useState } from 'react'
import AuthHeader from '../Components/AuthHeader'
import Quotes from '../Components/Quotes'
import { SigninTypes } from '@sunglah_npm/medium-blog'
import InputCompo from '../Components/InputCompo'
import AuthButton from '../Components/AuthButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { alertFn, iconsEnum } from '../Alerts'
import LoadingButton from '../Components/LoadingButton'

const Signin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [PostInput, setPostInput] = useState<SigninTypes>({
        email: "",
        password: ""
    })
    const [showPassword, setShowpassword] = useState(false);
    function handleChangePasswordStatus() {
        setShowpassword(!showPassword);
    }

    const signinuser = async(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`, PostInput);
            setLoading(false);
            const token = res.data.token;
            if(!token) {
                alertFn({title: "Signin error",text: "Please try again!", icon: iconsEnum.error, footer: ""})
            }
            localStorage.setItem("token", `Bearer ${token}`);
            alertFn({title: "Signin successful",text: "", icon: iconsEnum.success, footer: ""})
            navigate("/blogs");
        }catch(e: any) {
            setLoading(false);
            alertFn({title: "Signin error",text: e.response.data.error, icon: iconsEnum.error, footer: ""})
            return ;
        }
    }
 
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className="h-screen flex justify-center items-center">
                    <div className='p-3 w-full md:w-1/2'>
                        <AuthHeader subheading="Don't have an account? " subHeadlink='/signup' subHead='create' />
                        <div className='mt-5'>
                            <div className='mt-4'>
                                <InputCompo label="Email" placeholder="Enter your email" onChange={(e) =>
                                    setPostInput(data => ({ ...data, email: e.target.value }))
                                } />
                            </div>
                            <div className='mt-4'>
                                <InputCompo label="Password" type={!showPassword?"password":"text"} placeholder="Enter your password" onChange={(e) => { setPostInput(data => ({ ...data, password: e.target.value })) }} />
                                <img className='w-5 cursor-pointer relative -top-7.5 left-67.5' src={!showPassword ? "/eyeslash.svg" : "/eye.svg"} alt="" onClick={handleChangePasswordStatus}/>
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                        {loading ? <LoadingButton label='Sign in'/> :
                            <AuthButton buttonVal='Sign in' onClick={signinuser}/>}
                        </div>
                    </div>
                </div>
                <div className='invisible lg:visible'>
                    <Quotes />
                </div>
            </div>
        </div>
    )
}

export default Signin
