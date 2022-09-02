import React, {createContext, useContext, useState} from 'react'

const StateContext = createContext();

export const AccountContext = ({ children }) => {
    return (
    <StateContext.Provider value={{}}>

        {children}

    </StateContext.Provider> 
    )
}

