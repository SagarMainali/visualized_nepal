'use client'

import { useContext } from 'react'
import { AppContext } from '@/context/appContext';
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";

export default function App({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isMenuOpen } = useContext(AppContext);

    const sidebarWidthWhenOpened = '230px';
    const sidebarWidthWhenClosed = '60px';

    return (
        <div className="min-h-screen">
            <Sidebar isMenuOpen={isMenuOpen} sidebarWidthWhenOpened={sidebarWidthWhenOpened} sidebarWidthWhenClosed={sidebarWidthWhenClosed} />

            <main
                className='transition-all duration-300'
                style={{ marginLeft: isMenuOpen ? sidebarWidthWhenOpened : sidebarWidthWhenClosed }}
            >
                <TopNavbar />
                <div className="overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
