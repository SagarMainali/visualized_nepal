'use client'

import { AppContext } from '@/context/appContext';
import { usePathname } from 'next/navigation'
import { useContext } from 'react';
import { Menu } from 'lucide-react';

export default function TopNavbar() {

    const pathname = usePathname();
    const custom_pathname = pathname === '/' ? 'Dashboard' : (pathname.slice(1).toUpperCase().replace('-', ' '));

    const { setIsMenuOpen } = useContext(AppContext);

    return (
        <div className='relative py-3.5 flex justify-center bg-gray-100 shadow h-[54px]'>
            <span className='absolute left-3 cursor-pointer' onClick={() => setIsMenuOpen(prev => !prev)}>
                <Menu size={24} />
            </span>
            <span className='font-bold text-primary-gray'>{custom_pathname}</span>
        </div>
    )
}
