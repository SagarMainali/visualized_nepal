'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppContext } from '@/context/appContext';
import { LayoutDashboard, Coins, TrendingUp, Users, Carrot, Hospital } from 'lucide-react';

export default function Sidebar() {

    const pathname = usePathname();

    const isActive = (path: string) => path === pathname ? 'active' : '';

    const { isMenuOpen } = useContext(AppContext);

    return (
        <aside className={`h-screen py-2 border border-r-2 border-r-slate-200 shadow-2xl flex flex-col gap-1 text-primary-gray font-semibold ${isMenuOpen ? 'w-[230px] px-3' : 'w-[60px] px-2 items-center'}`}>
            {
                isMenuOpen
                    ? <p className='p-2 font-extrabold text-xl tracking-tight'>Visualized Nepal</p>
                    : <p className='p-2 font-extrabold text-xl'>VN</p>
            }

            <Link href='/' className={`mt-1 navlink-default ${isActive('/')}`}>
                <LayoutDashboard size={24} className={isMenuOpen ? 'mr-2' : ''} />
                <span className={isMenuOpen ? '' : 'hidden'}>Dashboard</span>
            </Link>

            <hr className='h-[1.5px] bg-gray-200 w-full' />

            <Link href='/gold-rate' className={`-mt-1 navlink-default ${isActive('/gold-rate')}`}>
                <Coins size={22} className={isMenuOpen ? 'mr-2' : ''} />
                <span className={isMenuOpen ? '' : 'hidden'}>Gold Trend</span>
            </Link>

            <Link href='/inflation' className={`navlink-default ${isActive('/inflation')}`}>
                <TrendingUp size={24} className={isMenuOpen ? 'mr-2' : ''} />
                <span className={isMenuOpen ? '' : 'hidden'}>Inflation</span>
            </Link>

            {/* <Link href='/remittance' className={`navlink-default ${isActive('/remittance')}`}>
                <HandCoins />
                <span className={isMenuOpen ? '' : 'hidden'}>Remittance Inflow</span>
            </Link>

            <Link href='/gasoline-price' className={`navlink-default ${isActive('/gasoline-price')}`}>
                <Fuel />
                <span className={isMenuOpen ? '' : 'hidden'}>Gasoline Prices</span>
            </Link> */}

            <Link href='/tourism' className={`navlink-default ${isActive('/tourism')}`}>
                <Users size={24} className={isMenuOpen ? 'mr-2' : ''} />
                <span className={isMenuOpen ? '' : 'hidden'}>Tourism</span>
            </Link>

            <Link href='/vegetables' className={`navlink-default ${isActive('/vegetables')}`}>
                <Carrot size={24} className={isMenuOpen ? 'mr-2' : ''} />
                <span className={isMenuOpen ? '' : 'hidden'}>Vegetables</span>
            </Link>

            <hr className='h-[1.5px] bg-gray-200 w-full' />

            <Link href='/hospital' className={`-mt-1 navlink-default ${isActive('/hospital')}`}>
                <Hospital size={24} className={isMenuOpen ? 'mr-2' : ''} />
                <span className={isMenuOpen ? '' : 'hidden'}>Hospital</span>
            </Link>

        </aside>
    )
}
