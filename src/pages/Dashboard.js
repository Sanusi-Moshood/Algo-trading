import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import styles from './dashboard.module.css' 
import { AccountContext } from '../context/Account' 
import { useContext } from 'react'
import DashboardPage from './DashboardPage'

const Dashboard  = () => {
   const {activeMenu,} = useStateContext()
   const { logout } = useContext(AccountContext);

  return (
    <BrowserRouter>
      <div className={styles.container}>
        {  activeMenu && 
               <div className={styles.sidebar}>
                <Sidebar />
              </div>
        }

        <div className={styles.main_page}>
          <div className={styles.nav}>
            <Navbar />
            <button onClick={logout} className={styles.Submit}>Logout</button>
          </div>

          <Routes>
            <Route path='/' element= {< DashboardPage />} />
            <Route path='/accounts' element='Accounts' />
            <Route path='/license' element='License' />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Dashboard 
