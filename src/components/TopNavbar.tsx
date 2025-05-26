'use client'

import { faBars, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from 'next/navigation'

export default function TopNavbar() {

    const pathname = usePathname();
    const custom_pathname = pathname === '/' ? 'Dashboard' : (pathname.slice(1).toUpperCase().replace('-', ' '));

    return (
        <div className='py-3.5 flex justify-between px-6 bg-gray-100 shadow'>
            <FontAwesomeIcon icon={faBars} className='text-[22px] cursor-pointer text-primary-gray' />
            <span className='font-bold text-primary-blue'>{custom_pathname}</span>
            <FontAwesomeIcon icon={faGear} className='text-[22px] cursor-pointer text-primary-gray' />
        </div>
    )
}
// onClick={() => setIsMenuOpened(prev => !prev)}