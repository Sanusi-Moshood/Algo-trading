import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { MdMenu } from 'react-icons/md';
import styles from '../pages/dashboard.module.css'


const Navbar = () => {

const {activeMenu, toggleSidebar, screenSize} = useStateContext();


  return (
    <div className={styles.nav}>
      {
         screenSize <= 900 && !activeMenu &&
        <MdMenu onClick={toggleSidebar} className={styles.open_sidebar}/>
        
      }
      <h4 className={styles.nav_username}>Welcome, Moshood</h4>
    </div>
  )
}

export default Navbar
