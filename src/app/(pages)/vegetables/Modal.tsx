import { X } from 'lucide-react';
import React from 'react'

export default function Modal({ modalMessage, setModalMessage }: ModalPropsT) {
    return (
        <div className='absolute inset-0 flex justify-center items-center bg-gray-900/60' onClick={(e) => {
            e.stopPropagation();
            setModalMessage(null);
        }}>
            <div className='px-8 py-6 bg-white rounded max-w-[450px]'>
                <div className='flex justify-between items-center mb-3'>
                    <span className='font-semibold'>🔔 ALERT</span>
                    <span className='cursor-pointer p-1 rounded-full hover:bg-slate-200 hover:scale-125 duration-200' onClick={() => setModalMessage(null)}>
                        <X size={22} />
                    </span>
                </div>
                <p>{modalMessage}</p>
                <button className='bg-blue-500 mt-4 rounded px-4 py-1 text-white cursor-pointer font-semibold drop-shadow-xl hover:scale-110 duration-200' onClick={() => setModalMessage(null)}>OK</button>
            </div>
        </div>
    )
}
