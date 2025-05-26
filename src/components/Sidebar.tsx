'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {

    const pathname = usePathname();

    const isActive = (path: string) => path === pathname ? 'active' : '';

    return (
        <aside className="h-full w-[250px] border border-r-2 shadow-2xl flex flex-col p-4 gap-2 text-primary-gray">
            <Link href='/' className={`font-semibold border-b-2 border-primary-gray ${isActive('/')}`}>Dashboard</Link>
            <Link href='/gold-rate' className={isActive('/gold-rate')}>Gold Trend</Link>
            <Link href='/inflation' className={isActive('/inflation')}>Inflation</Link>
            <Link href='/remittance' className={isActive('/remittance')}>Remittance Inflow</Link>
            <Link href='/gasoline-price' className={isActive('/gasoline-price')}>Gasoline Prices</Link>
            <Link href='/tourism' className={isActive('/tourism')}>Tourism</Link>
            <hr />
            <Link href='/hospital' className={isActive('/hospital')}>Hospital</Link>
        </aside>
    )
}
