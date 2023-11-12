import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'

import { setCodeSend, setUser } from '../../redux/reducers/user'
import Input from '../Common/Input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '../Common/Button'

const formSchema = yup.object({
    code: yup.string().required("Verification code is required")
})

const LoginFrom = () => {

    const { handleSubmit, formState: { errors }, register } = useForm({
        resolver: yupResolver(formSchema),
    });

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(60);
    const [codeSending, setCodeSending] = useState(false)
    const [loading, setLoading] = useState(false)

    const formSubmit = async (data) => {
        try {
            if (data && userData) {
                setLoading(true)
                const res = await axios({
                    method: "POST",
                    data: { ...data, ...userData },
                    url: `${import.meta.env.VITE_API_URL}/api/user/login`,
                })
                localStorage.setItem("texlang-auth-token", res.data.token)
                dispatch(setUser(res.data.user));
            } else {
                toast.error("Plzz Re-Send the code");
                dispatch(setCodeSend(false));
            }
        } catch (error) {
            setLoading(false)
            const message = error?.response?.data?.message || 'Someting went wrong! Try Again'
            toast.error(message)
        }
    };

    const resendCode = async () => {
        try {
            if (userData) {
                setCodeSending(true)
                await axios({
                    method: "POST",
                    url: `${import.meta.env.VITE_API_URL}/api/user/sendCode`,
                    data: userData,
                });
                toast.success("Verification Code Resend Successfully");
                setCodeSending(false)
                setResendDisabled(true);

                let remainingTime = 60;
                const timerInterval = setInterval(() => {
                    remainingTime--;
                    setTimer(remainingTime);

                    if (remainingTime <= 0) {
                        clearInterval(timerInterval);
                        setResendDisabled(false);
                        setTimer(60);
                    }
                }, 1000);
            } else {
                dispatch(setCodeSend(false));
                toast.error("Plzz Re-Enter the Credentials");
            }
        } catch (error) {
            setCodeSend(false)
            toast.error("Unable to Send Verification Code Plzz Try again");
        }
    };

    useEffect(() => {
        setResendDisabled(true);

        let remainingTime = 60;
        const timerInterval = setInterval(() => {
            remainingTime--;
            setTimer(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                setResendDisabled(false);
                setTimer(60);
            }
        }, 1000);
    }, []);

    return (
        <div className='flex flex-col gap-2.5 w-full'>
            <h1 className='font-sans text-3xl'>Texlang Enterprise Login</h1>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col justify-center gap-6 w-full'>

                <Input type='text' placeholder={'Enter Verification Code'} label={'Verification Code'} id={'code'} register={{ ...register('code') }} errorMessage={errors.code?.message} />

                <Button type='submit' loading={loading} className={`bg-blue-500 py-1.5 px-2.5 text-white rounded select-none ${loading ? 'opacity-50 cursor-default' : 'hover:bg-blue-600'}`} disabled={loading} text={'Sign In'} />

            </form>

            <div className='flex items-start'>
                <button className={`${resendDisabled || codeSending || loading ? 'opacity-60 ' : 'opacity-100 hover:text-blue-600'} text-blue-500 `} onClick={resendCode} disabled={resendDisabled || codeSending || loading}>
                    {codeSending ? 'Sending...' : 'Resend Code'}
                </button>
                {resendDisabled && (
                    <span className='ml-2 text-gray-500'>
                        Resend in {timer} seconds
                    </span>
                )}
            </div>
        </div>
    )
}

export default LoginFrom
