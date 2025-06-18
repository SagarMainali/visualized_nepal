import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                    <FontAwesomeIcon icon={faXmark} className='cursor-pointer p-2 rounded-full text-[16px] hover:bg-slate-200 hover:scale-125 duration-200' onClick={() => setModalMessage(null)} />
                </div>
                <p>{modalMessage}</p>
                <button className='bg-blue-500 mt-4 rounded px-4 py-1 text-white cursor-pointer font-semibold drop-shadow-xl hover:scale-110 duration-200' onClick={() => setModalMessage(null)}>OK</button>
            </div>
        </div>
    )
}
