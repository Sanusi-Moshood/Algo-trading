import React, {createContext, useContext, useState} from 'react'

const StateContext = createContext();



export const AccountContext = ({ children }) => {
    const [isForgot, setIsForgot] = useState(false)

    return (
    <StateContext.Provider value={{
        isForgot,
        setIsForgot
    }}>

        {children}

    </StateContext.Provider> 
    )
}

export const useStateContext = () => useContext(StateContext);