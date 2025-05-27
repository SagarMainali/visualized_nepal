import React from 'react'
import '@/styles/loader.css'

export default function Loader() {
    return (
        <div className='absolute inset-0 flex justify-center items-center gap-2'>
            <span className='loader'></span>
            <span>Loading chart</span>
            <span className='loader'></span>
        </div>
    )
}