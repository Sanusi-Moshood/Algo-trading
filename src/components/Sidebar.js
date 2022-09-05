import React from 'react'
import styles from '../pages/dashboard.module.css'
import { Link } from 'react-router-dom'
import {MdDashboard, MdSwitchAccount, MdCancel} from 'react-icons/md'
import {TbLicense} from 'react-icons/tb'
import { useStateContext } from '../context/ContextProvider'


const Sidebar = () => {
  const {activeMenu, toggleSidebar, setActiveMenu, screenSize} = useStateContext()

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

        <div className={styles.side_link} >
          <MdDashboard />
          <Link to={'/dashboard'} onClick={handleCloseSideBar}>Dashboard</Link>
        </div>
        <div className={styles.side_link} >
          <MdSwitchAccount />
          <Link to={'/accounts'} onClick={handleCloseSideBar}>Accounts</Link>
        </div>
        <div className={styles.side_link} >
          <TbLicense />
          <Link to={'/license'} onClick={handleCloseSideBar}>License</Link>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
