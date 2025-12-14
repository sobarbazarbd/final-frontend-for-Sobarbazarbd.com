'use client'
import { useEffect } from 'react'

const ColorInit = ({ color }) => {
    useEffect(() => {
        if (color === true) {
            // localStorage.setItem('theme', 'color-two');
            document.documentElement.classList.add('color-one');
        } else {
            document.documentElement.classList.remove('color-one');
        }
    }, [color]);
    return (
        null
    )
}

export default ColorInit