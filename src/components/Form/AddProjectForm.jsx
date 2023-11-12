import axios from 'axios'
import * as yup from 'yup'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'

import Input from '../Common/Input'
import UploadFiles from './UploadFiles'
import DisplayTable from '../Table/DisplayTable'
import { clearFiles, setClearFile } from '../../redux/reducers/file'
import Button from '../Common/Button'

const formSchema = yup.object({
    name: yup.string().required("Project Name is Required"),
    department: yup.string().required("Project Department is Required"),
    description: yup.string().optional()
})

const AddProjectForm = () => {

    const [loading, setLoading] = useState(false)

    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    })

    const { files } = useSelector((state) => state.file)
    const dispatch = useDispatch()

    const isValidWork = () => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            if (!file?.sourceLanguage || file.targetLanguage?.length === 0 || !file?.contentType) {

                return false;
            }
        }
        return true;
    }

    const formSubmit = async (data) => {
        if (files.length === 0) {
            return toast.error("Plzz Upload Work")
        }
        if (!files || !isValidWork()) {
            return toast.error("Plzz select all Fields")
        }
        setLoading(true)
        let totalCost = 0;
        files.forEach((work) => {
            if (Number(work.wordCount) > 0) {
                totalCost += (Number(work.wordCount) * 2.2) * work.targetLanguage?.length;
            }
            else if (Number(work.value)) {
                totalCost += (Number(work.value) * 1.5) * work.targetLanguage?.length
            }
        })
        try {
            await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/api/project`,
                data: { ...data, totalCost, works: files },
            })
            toast.success("Project Added")
            setLoading(false)
            dispatch(setClearFile(true))
            dispatch(clearFiles())
            reset()
        } catch (error) {
            const message = error.response.data.message || 'Unable to Add Project'
            setLoading(false)
            toast.error(message)
        }
    }

    return (
        <div className='flex flex-col px-6 py-4 '>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit(formSubmit)}>
                <div className='flex lg:flex-row flex-col lg:items-center lg:gap-4 gap-0.5 w-full'>
                    <label htmlFor="name" className='lg:w-40 text-sm'>Project Name <span className='text-red-500'>*</span></label>
                    <Input type="text" id="name" placeholder='Enter Project Name' errorMessage={errors?.name?.message} register={{ ...register('name') }} />
                </div>
                <div className='flex lg:flex-row flex-col lg:items-center lg:gap-4 gap-0.5 w-full'>
                    <label htmlFor="department" className='lg:w-40 text-sm'>Department Name <span className='text-red-500'>*</span></label>
                    <Input type="text" id="department" placeholder='Enter Department Name' errorMessage={errors?.department?.message} register={{ ...register('department') }} />
                </div>
                <div className='flex lg:flex-row flex-col  lg:gap-4 gap-0.5 w-full'>
                    <label htmlFor="description" className='lg:w-40 text-sm'>Project Description</label>
                    <textarea id="description" rows={3} register={{ ...register('description') }} placeholder='Enter Project Description' className='w-full border border-gray-400 py-1.5 px-2.5 focus:outline-blue-500' />
                </div>
                <div className='flex lg:flex-row flex-col  lg:gap-4 gap-0.5 w-full'>
                    <label htmlFor="files" className='lg:w-40 text-sm'>Upload Your Work <span className='text-red-500'>*</span></label>
                    <UploadFiles />
                </div>
                <DisplayTable />
                <div className='flex justify-center items-center'>
                    <Button type='submit' disabled={loading} className={`bg-blue-500 text-white font-semibold  py-1 font-sans w-28 rounded ${loading ? 'opacity-70 cursor-default' : 'hover:bg-blue-600'}`} loading={loading} text={'Submit'} />
                </div>
            </form>
        </div>
    )
}

export default AddProjectForm
