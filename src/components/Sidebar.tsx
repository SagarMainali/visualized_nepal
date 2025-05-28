'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faCircleDollarToSlot, faGasPump, faGem, faHospitalUser, faPassport, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '@/context/appContext';

export default function Sidebar() {

    const pathname = usePathname();

    const isActive = (path: string) => path === pathname ? 'active' : '';

    const { isMenuOpen } = useContext(AppContext);

    return (
        <aside className={`h-screen border border-r-2 border-r-slate-200 shadow-2xl flex flex-col p-4 gap-3 text-primary-gray font-semibold ${isMenuOpen ? 'w-[250px]' : 'w-[60px] items-center'}`}>
            <Link href='/' className={`${isActive('/')}`}>
                <FontAwesomeIcon icon={faChartSimple} className={!isMenuOpen ? 'text-[22px]' : 'icon-style-default'} />
                <span className={isMenuOpen ? '' : 'hidden'}>Dashboard</span>
            </Link>

            <hr className='h-[2px] bg-slate-800 w-full' />

            <Link href='/gold-rate' className={isActive('/gold-rate')}>
                <FontAwesomeIcon icon={faGem} className={!isMenuOpen ? 'text-[22px]' : 'icon-style-default'} />
                <span className={isMenuOpen ? '' : 'hidden'}>Gold Trend</span>
            </Link>

            <Link href='/inflation' className={isActive('/inflation')}>
                <FontAwesomeIcon icon={faSackDollar} className={!isMenuOpen ? 'text-[22px]' : 'icon-style-default'} />
                <span className={isMenuOpen ? '' : 'hidden'}>Inflation</span>
            </Link>

            <Link href='/remittance' className={isActive('/remittance')}>
                <FontAwesomeIcon icon={faCircleDollarToSlot} className={!isMenuOpen ? 'text-[22px]' : 'icon-style-default'} />
                <span className={isMenuOpen ? '' : 'hidden'}>Remittance Inflow</span>
            </Link>

            <Link href='/gasoline-price' className={isActive('/gasoline-price')}>
                <FontAwesomeIcon icon={faGasPump} className={!isMenuOpen ? 'text-[22px]' : 'icon-style-default'} />
                <span className={isMenuOpen ? '' : 'hidden'}>Gasoline Prices</span>
            </Link>

            <Link href='/tourism' className={isActive('/tourism')}>
                <FontAwesomeIcon icon={faPassport} className={!isMenuOpen ? 'text-[22px]' : 'icon-style-default'} />
                <span className={isMenuOpen ? '' : 'hidden'}>Tourism</span>
            </Link>

            <hr />

            <Link href='/hospital' className={isActive('/hospital')}>
                <FontAwesomeIcon icon={faHospitalUser} className={!isMenuOpen ? 'text-[22px]' : 'icon-style-default'} />
                <span className={isMenuOpen ? '' : 'hidden'}>Hospital</span>
            </Link>
        </aside>
    )
}
