import { MouseEvent, useState } from 'react'
import AuthHeader from '../Components/AuthHeader'
import InputCompo from '../Components/InputCompo'
import Quotes from '../Components/Quotes'
import { SignupTypes } from '@sunglah_npm/medium-blog'
import AuthButton from '../Components/AuthButton'
import { alertFn, iconsEnum } from '../Alerts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '../Components/LoadingButton'

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [PostInput, setPostInput] = useState<SignupTypes>({
        email: "",
        password: "",
        name: ""
    });
    const [showPassword, setShowpassword] = useState(false);
    function handleChangePasswordStatus() {
        setShowpassword(!showPassword);
    }

    const signupuser = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, PostInput);
            setLoading(false);
            const token = res.data.token;
            if (!token) {
                alertFn({ title: "Signup error", text: "Please try again!", icon: iconsEnum.error, footer: "" })
            }
            localStorage.setItem("token", `Bearer ${token}`);
            alertFn({ title: "Signup successful", text: "", icon: iconsEnum.success, footer: "" })
            navigate("/blogs");
        } catch (e: any) {
            setLoading(false);
            alertFn({ title: "Signup error", text: e.response.data.error, icon: iconsEnum.error, footer: "" })
            return;
        }
    }

   
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className="h-screen flex justify-center items-center">
                    <div className='p-3 w-full md:w-1/2'>
                        <AuthHeader subheading='Already have an account? ' subHeadlink='/signin' subHead='login' />
                        <div className='mt-5'>
                            <div className='mt-4'>
                                <InputCompo label="Name" placeholder="Enter your name" onChange={(e) => { setPostInput(data => ({ ...data, name: e.target.value })) }} />
                            </div>
                            <div className='mt-4'>
                                <InputCompo label="Email" placeholder="Enter your email" onChange={(e) =>
                                    setPostInput(data => ({ ...data, email: e.target.value }))
                                } />
                            </div>
                            <div className='mt-4 '>
                                <InputCompo label="Password" type={!showPassword ? "password" : "text"} placeholder="Enter your password" onChange={(e) => { setPostInput(data => ({ ...data, password: e.target.value })) }} />
                                <img className='w-5 cursor-pointer relative -top-7.5 left-67.5' src={!showPassword ? "/eyeslash.svg" : "/eye.svg"} alt="" onClick={handleChangePasswordStatus} />
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            {loading ? <LoadingButton label='Sign up'/> :
                                <AuthButton buttonVal='Sign up' onClick={signupuser} />}
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

export default Signup
