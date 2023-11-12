import React from 'react'
import { ClipLoader } from 'react-spinners'

const ButtonLoader = () => {
    return (
        <div className='flex gap-1.5 items-center justify-center'>
            <ClipLoader color='#ffffff' loading={true} size={28} />
        </div>
    )
}

export default ButtonLoader
