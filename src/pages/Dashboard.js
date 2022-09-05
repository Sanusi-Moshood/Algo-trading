import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import styles from './dashboard.module.css'  


const Dashboard  = () => {
   const {activeMenu,} = useStateContext()

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
          </div>

          <Routes>
            <Route path='/dashboard' element='DASHBOARD' />
            <Route path='/accounts' element='Accounts' />
            <Route path='/license' element='License' />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Dashboard 
