import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import styles from './dashboard.module.css' 
import DashboardPage from './DashboardPage'
import AccountPage from './AccountPage'
import PageNotFound from './PageNotFound'
import AddAccount from '../components/AddAccount'
import Userlevel from '../components/Userlevel'
import GroupsPage from './GroupsPage'

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
            <Route path='/' element= {< DashboardPage />} />

            <Route path='/userlevel' element={< Userlevel />}/>
            <Route path='/accounts' element={< AccountPage />}/>
            <Route path='/groups' element={< GroupsPage />}/>
            <Route path='/accounts/add' element={< AddAccount/>}/>
            <Route path='/groups' element='Groups' />
            <Route path='/license' element='License' />
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Dashboard 
