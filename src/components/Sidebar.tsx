'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartSimple, faCircleDollarToSlot, faGasPump, faGem, faHospitalUser, faPassport, faSackDollar } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {

    const pathname = usePathname();

    const isActive = (path: string) => path === pathname ? 'active' : '';

    const [isMenuOpened, setIsMenuOpened] = useState(true);

    return (
        <aside className={`h-full overflow-hidden border border-r-2 border-r-slate-200 shadow-2xl flex flex-col p-4 gap-3 text-primary-gray font-semibold ${isMenuOpened ? 'w-[250px]' : ''}`}>
            <Link href='/' className={`${isActive('/')}`}>
                <FontAwesomeIcon icon={faChartSimple} className={!isMenuOpened ? 'text-[22px]' : 'icon-h-default'} />
                <span className={isMenuOpened ? '' : 'hidden'}>Dashboard</span>
            </Link>
            {/* <FontAwesomeIcon icon={faBars} className={`text-primary-gray cursor-pointer ${!isMenuOpened ? 'text-[22px]' : 'icon-h-default'}`} onClick={() => setIsMenuOpened(prev => !prev)} /> */}

            <hr className='h-[2px] bg-slate-800 -mt-[4px]' />

            <Link href='/gold-rate' className={isActive('/gold-rate')}>
                <FontAwesomeIcon icon={faGem} className={!isMenuOpened ? 'text-[22px]' : 'icon-h-default'} />
                <span className={isMenuOpened ? '' : 'hidden'}>Gold Trend</span>
            </Link>

            <Link href='/inflation' className={isActive('/inflation')}>
                <FontAwesomeIcon icon={faSackDollar} className={!isMenuOpened ? 'text-[22px]' : 'icon-h-default'} />
                <span className={isMenuOpened ? '' : 'hidden'}>Inflation</span>
            </Link>

            <Link href='/remittance' className={isActive('/remittance')}>
                <FontAwesomeIcon icon={faCircleDollarToSlot} className={!isMenuOpened ? 'text-[22px]' : 'icon-h-default'} />
                <span className={isMenuOpened ? '' : 'hidden'}>Remittance Inflow</span>
            </Link>

            <Link href='/gasoline-price' className={isActive('/gasoline-price')}>
                <FontAwesomeIcon icon={faGasPump} className={!isMenuOpened ? 'text-[22px]' : 'icon-h-default'} />
                <span className={isMenuOpened ? '' : 'hidden'}>Gasoline Prices</span>
            </Link>

            <Link href='/tourism' className={isActive('/tourism')}>
                <FontAwesomeIcon icon={faPassport} className={!isMenuOpened ? 'text-[22px]' : 'icon-h-default'} />
                <span className={isMenuOpened ? '' : 'hidden'}>Tourism</span>
            </Link>

            <hr />

            <Link href='/hospital' className={isActive('/hospital')}>
                <FontAwesomeIcon icon={faHospitalUser} className={!isMenuOpened ? 'text-[22px]' : 'icon-h-default'} />
                <span className={isMenuOpened ? '' : 'hidden'}>Hospital</span>
            </Link>
        </aside>
    )
}
