import React from 'react'
import ButtonLoader from '../Loader/Button'

const Button = ({ text, loading, onClick, className, type = 'button', disabled }) => {
    return (
        <button type={type} disabled={disabled} className={`${className}`} onClick={onClick}>
            {loading ? <ButtonLoader /> : text}
        </button>
    )
}

export default Button
