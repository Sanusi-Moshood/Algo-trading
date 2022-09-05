import React, {createContext, useContext, useState, useEffect} from 'react'

const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize', handleResize)
        handleResize() 
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        if (screenSize <= 900 ) {
          setActiveMenu(false);
        } else {
          setActiveMenu(true)
        }
      }, [screenSize])

    const toggleSidebar = () => {
        setActiveMenu(prev => !prev)
    }

    return (
    <StateContext.Provider value={{
        activeMenu,
        setActiveMenu,
        toggleSidebar,
        screenSize
    }}>

        {children}

    </StateContext.Provider> 
    )
}

export const useStateContext = () => useContext(StateContext);