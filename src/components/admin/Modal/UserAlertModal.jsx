import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { updateUser } from '../../../redux/reducers/user'
import Button from '../../Common/Button'

const UserAlertModal = ({ open, setOpen, user }) => {

  const [loading, setLoading] = useState('')

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user) {
      setLoading(true)
      try {
        await axios({
          method: "PUT",
          url: `${import.meta.env.VITE_API_URL}/api/admin/user/changeStatus`,
          data: { id: user.id, status: !user.status },
        })
        setLoading(false)
        setOpen(false)
        toast.success(`User ${user.status ? 'Deactivated' : 'Activated'} `)
        dispatch(updateUser({ ...user, status: !user.status }))
      } catch (error) {
        setLoading(false)
        setOpen(false)
        toast.error(`Unable to ${user.status ? 'Deactivated' : 'Activated'} User`)
      }
    }
  }
  return (
    <>
      {open && <div>
        <div className='fixed  top-0 bottom-0 z-20 right-0 left-0 bg-slate-500 bg-opacity-40' ></div>
        <div className='fixed  right-1/2 top-1/2 z-40 translate-x-1/2 -translate-y-1/2 overflow-y-hidden md:min-w-[40%] min-w-[60%] bg-white px-4 py-4'>
          <h1 className='bg-red-500 text-whtie px-4 py-1.5 font-lg font-bold text-white text-start'>{user.status ? 'Deactivate User' : 'Activatue User'}</h1>
          <p className='px-4 py-2.5 text-start font-semibold'>{`Are you sure you want to ${user.status ? 'deactivate' : 'activate'} the user?`}</p>
          <div className='w-full flex justify-end gap-2'>
            <Button onClick={() => setOpen(false)} className='px-2.5 py-1.5 border border-black font-sans hover:bg-gray-100 w-20' text={'Close'} />
            <Button type='submit' disabled={loading} loading={loading} onClick={handleSubmit} className={`px-2.5 py-1.5 bg-blue-500 text-white w-24 ${loading ? 'opacity-60' : 'hover:bg-blue-600'}`} text={`${user.status ? 'Deactivate' : 'Activate'}`} />
          </div>
        </div>
      </div>}
    </>
  )
}

export default UserAlertModal;
