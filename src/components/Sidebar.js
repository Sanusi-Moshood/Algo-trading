import React from 'react'
import styles from '../pages/dashboard.module.css'
import { NavLink } from 'react-router-dom'
import {MdDashboard, MdSwitchAccount, MdCancel} from 'react-icons/md'
import {TbLicense} from 'react-icons/tb'
import { useStateContext } from '../context/ContextProvider'
import { AccountContext } from '../context/Account'
import { useContext } from 'react'


const Sidebar = () => {
  const {activeMenu, toggleSidebar, setActiveMenu, screenSize} = useStateContext()
  const { logout } = useContext(AccountContext);

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false)
    }
  }


  return (
    <div className={styles.sidebar_container}>
      <div className={styles.side_logo}>
        {
           screenSize <= 900 && 
           <MdCancel  className={styles.close_sidebar} onClick={toggleSidebar}/>
        }
        
        <h2>ALGO TRADING</h2>
      </div>

      <div className={styles.side_links}>
          <NavLink to={'/'} className={({isActive}) => (isActive ? styles.side_link : styles.side_link_active) }  onClick={handleCloseSideBar}> <MdDashboard /> Dashboard</NavLink>
          
          <NavLink to={'/accounts'} className={({isActive}) => (isActive ? styles.side_link : styles.side_link_active) }  onClick={handleCloseSideBar}> <MdSwitchAccount /> Accounts</NavLink>
          
          <NavLink to={'/license'} className={({isActive}) => (isActive ? styles.side_link : styles.side_link_active) }  onClick={handleCloseSideBar}> <TbLicense /> License</NavLink>
      </div>
      <div className="logout">
      <button onClick={logout} className={styles.Logout_btn}>Logout</button>

      </div>
    </div>
  )
}

export default Sidebar
