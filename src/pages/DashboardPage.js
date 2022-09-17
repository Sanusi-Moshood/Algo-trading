import React from 'react'
import { AccountContext } from '../context/Account'
import styles from './dashboard.module.css'
import { useContext,useState } from 'react'


const DashboardPage = () => {
    const {userData} = useContext(AccountContext)
    const [sort, setSort]=useState('All')
    
  return (
    <div className={styles.dashPage}>
      <h1>Orders Status</h1>
      <div className={styles.sort}>
      <p>Sort by {sort}</p> 
      <select  value={sort} onChange={e=>setSort(e.target.value)}>
      <option>All</option>
      <option>Group</option>
      <option>Account</option>
      <option>Order Id</option>
      </select>
      </div>
    </div>

// ********************** AZEEZ CREATE A TABLE COMPONENT HERE 
//*********************** AND INSIDE IT YOU SHOULD CREATE A DUMMY TABLE WITH ALL INFO 
//*********************** I'LL ADD PAGINATION, MAKE API CALL AND MAP OVER THE DATA */
  )
}

export default DashboardPage
