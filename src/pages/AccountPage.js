import React, { useContext } from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import styles from './dashboard.module.css'
import { Link } from 'react-router-dom'
import { AccountSettings } from '../context/AccountSettings'




const AccountPage = () => {
const {data, AccountParams, loading} = useContext(AccountSettings)
  return (
    <div className={styles.tablecontainer}>
      <h1>Accounts</h1>
    <table>
      <thead>
        <tr>
        <th scope="col">Account Id</th>
        <th scope="col">Enabled</th>
        <th scope="col">MIS Enabled</th>
        <th scope="col">CNC Enabled</th>
        <th scope="col">Fno Enabled</th>
        <th scope="col">Start time</th>
        <th scope="col">End time</th>
        <th scope="col">Login Status</th>
        <th scope="col">Last Login Time</th>
        <th scope="col">Login URL</th>
        <th scope="col">delete</th>
        <th scope="col">edit</th>
        </tr>
      </thead>
      <tbody>
      {
        loading ?
        (
          <tr>
            <td>Loading</td>
          </tr>
        )
        :
        (
          data.map((item) => (
            <tr className={styles.t_row} key={item}>
            <td className={styles.t_td}>{item}</td>
            <td className={styles.t_td}>{AccountParams.item.Enabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td}>{AccountParams.item.CommodityMISEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td}>{AccountParams.item.EquityCNCEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td} >{AccountParams.item.FnoCNCEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td} >{item.StartTime}</td>
            <td className={styles.t_td} >{item.EndTime}</td>
            <td className={styles.t_td} >{item.LoginStatus}</td>
            <td className={styles.t_td} >{item.LastLoginTime}</td>
            <td className={styles.t_td} ><a href="http://localhost:3000/accounts">{item.LoginUrl}</a></td>
            <td className={styles.t_td} >del</td>
            <td className={styles.t_td} >edit</td>
          </tr>
          ))
        )
      }
      </tbody>
    </table>

  <button className={styles.add_account}><Link to={'/accounts/add'} >Create new Account</Link></button>
  
  
  
  
   </div>

  )
}

export default AccountPage
