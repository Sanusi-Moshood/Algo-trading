import React from 'react'
import { AccountContext } from '../context/Account'
import styles from './dashboard.module.css'
import { useContext } from 'react'

const DashboardPage = () => {
    const {userData} = useContext(AccountContext)
  return (
    <div>
        <br />
        <br />
        <br />
        <h1 >
        
        {
          `Welcome ${userData}`
        }
      </h1>
      <br />
      <br />
      <br />
    </div>

  )
}

export default DashboardPage
