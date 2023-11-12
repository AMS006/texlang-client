import { useState } from 'react'

import UserAlertModal from './Modal/UserAlertModal'

const UserDeactivateButton = ({ user }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const handleEdit = () => {
        setModalOpen(true)
    }
    return (
        <>
            <UserAlertModal open={modalOpen} setOpen={setModalOpen} user={user} />
            <button className='text-blue-500 hover:underline' onClick={handleEdit}>
                {user.status ? 'Deactivate' : 'Activate'}
            </button>
        </>
    )
}

export default UserDeactivateButton
