import axios from 'axios'
import * as yup from 'yup'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from './Button'

const formSchema = yup.object({
    comment: yup.string().required("Comment is Required").trim(),

})
const Comment = ({ id }) => {
    const { handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(formSchema)
    })
    const [loading, setLoading] = useState(false)
    const formSubmit = async (data) => {
        try {
            setLoading(true)
            await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/api/work/comment/${id}`,
                data,

            })
            setLoading(false)
            toast.success("Comment Added")
            reset()
        } catch (error) {
            setLoading(false)
            const message = error.response?.data?.message || "Unable to add comment"
            toast.error(message)
        }
    }
    return (
        <form className='flex flex-col' onSubmit={handleSubmit(formSubmit)}>
            <label htmlFor="comment" className='font-semibold '>Comment</label>
            <textarea id="comment" rows="6" {...register('comment')} placeholder='Enter Comment' className={`px-2 py-1.5 border w-full rounded  ${errors.comment?.message ? 'border-red-500 focus:outline-red-500' : 'border-gray-400 focus:outline-blue-500'}`}></textarea>
            <span className='text-xs text-red-500'>{errors.comment?.message}</span>
            <div className='flex justify-end py-2.5'>
                <Button type='submit' disabled={loading} className={`bg-blue-500 text-white font-semibold px-1.5 w-20 py-1 ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`} loading={loading} text={'Send'} />
            </div>
        </form>
    )
}

export default Comment
