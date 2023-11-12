import axios from 'axios';
import * as yup from 'yup'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'

import Layout from '../layout';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';


const formSchema = yup.object({
    currentPassword: yup.string().required("Current Password is Required"),
    newPassword: yup.string().required("New password is required").min(4, "Password must be atleast 4 characters long"),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref('newPassword'), null], 'Password must match')
})

const ChangePassword = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(formSchema)
    })
    const formSubmit = async (data) => {
        try {
            setLoading(true)
            await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/api/user/changePassword`,
                data,
            })
            setLoading(false)
            toast.success("Password Changed Successfully")
            reset()
            navigate('/Enterprise/EnterpriseLanding')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Unable to Reset Password"
            toast.error(errorMessage)
            setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-4 px-6 py-4'>
            <h3 className='font-sans text-2xl'>Change Password</h3>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-3'>

                <Input label={'Current Password'} id={'currentPassword'} type={'password'} placeholder={'Enter Current Password'} register={{ ...register('currentPassword') }} errorMessage={errors?.currentPassword?.message} />

                <Input label={'New Password'} id={'newpassword'} type={'password'} placeholder={'Enter New Password'} register={{ ...register('newPassword') }} errorMessage={errors?.newPassword?.message} />

                <Input label={'Confirm Password'} id={'confirmPassword'} type={'password'} placeholder={'Enter Confirm Password'} register={{ ...register('confirmPassword') }} errorMessage={errors?.confirmPassword?.message} />

                <div className='flex items-start justify-start'>
                    <Button type="submit" disabled={loading} loading={loading} text={'Submit'} className={`bg-blue-500 text-white px-2.5 py-1.5 w-24 rounded ${loading ? 'opacity-50' : 'cursor-pointer hover:bg-blue-600'}`} />
                </div>
            </form>
        </div>
    )
}

export default Layout(ChangePassword);
