import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { MdMenu } from 'react-icons/md';
import styles from '../pages/dashboard.module.css'
import { AccountContext } from '../context/Account';
import { useContext } from 'react';


const Navbar = () => {
const {userData} = useContext(AccountContext)
const {activeMenu, toggleSidebar, screenSize} = useStateContext();


  return (
    <div className={styles.nav}>
      {
         screenSize <= 900 && !activeMenu &&
        <MdMenu onClick={toggleSidebar} className={styles.open_sidebar}/>
        
      }
      
    </div>
  )
}

export default Navbar
