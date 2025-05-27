'use client'

import { useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react';

type AppContextT = {
    isMenuOpen: boolean,
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext({} as AppContextT);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return <AppContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
        {children}
    </AppContext.Provider>
}