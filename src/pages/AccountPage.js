import React, { useContext } from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import styles from './dashboard.module.css'
import { Link } from 'react-router-dom'
import { AccountSettings } from '../context/AccountSettings'
import {MdDelete} from 'react-icons/md'
import {BiEditAlt} from 'react-icons/bi'
import { AccountContext } from '../context/Account'
import { useState } from 'react'
import axios from 'axios'


const AccountPage = () => {
  const {userData, status} = useContext(AccountContext)
const {data, loading, editFunc, setData} = useContext(AccountSettings)

const deleteFunc=  async (id) => {
    const remainingAccount = data.filter((data) => id !== data.AccountID);
  setData(remainingAccount);
  try {
    const res =  await axios
    .delete(
      `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/accounts/${id}`,
     {
      headers:{
        AccessToken:userData.accessToken,
        Userid: userData.userId
      }
    }      
    )

  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }


}



  return (
    <div className={styles.tablecontainer}>
      <h1>Accounts</h1>
    <table>
      <thead className={styles.thead}>
        <tr >
        <th scope="col">Account Id</th>
        <th scope="col">Enabled</th>
        <th scope="col">Equity CNC</th>
        <th scope="col">Equity MIS</th>
        <th scope="col">Equity Start time</th>
        <th scope="col">Equity End time</th>
        <th scope="col">Fno CNC</th>
        <th scope="col">Fno MIS</th>
        <th scope="col">Fno Start time</th>
        <th scope="col">Fno End time</th>
        <th scope="col">Commodity CNC</th>
        <th scope="col">Commodity MIS</th>
        <th scope="col">Commodity Start time</th>
        <th scope="col">Commodity End time</th>
        <th scope="col">Login Status</th>
        <th scope="col">Last Login Time</th>
        <th scope="col">Login URL</th>
        <th scope="col">edit</th>
        <th scope="col">delete</th>
        </tr>
      </thead>
      <tbody>
      {
        loading ?
        (
          <tr>
            <td>Loading.........</td>
          </tr>
        )
        :
        (
          data.map((item) => (
            <tr className={styles.t_row} key={item.AccountID}>
            <td className={styles.t_td}>{item.AccountID}</td>
            <td className={styles.t_td}>{item.Enabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td}>{item.EquityCNCEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td}>{item.EquityMISEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td} >{item.EquityStartTime}</td>
            <td className={styles.t_td} >{item.EquityEndTime}</td>
            <td className={styles.t_td}>{item.FnoCNCEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td}>{item.FnoMISEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td} >{item.FnoStartTime}</td>
            <td className={styles.t_td} >{item.FnoEndTime}</td>
            <td className={styles.t_td}>{item.CommodityCNCEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td}>{item.CommodityMISEnabled ? 'ON' : 'OFF'}</td>
            <td className={styles.t_td} >{item.CommodityStartTime}</td>
            <td className={styles.t_td} >{item.CommodityEndTime}</td>
            <td className={styles.t_td} >{item.LoginStatus}</td>
            <td className={styles.t_td} >{item.LastLoginTime}</td>
            <td className={styles.t_td} ><a href="http://localhost:3000/accounts">{item.LoginUrl}</a></td>
            <td className={styles.t_td} ><Link to={`/accounts/edit/${item.AccountID}`} >
              <BiEditAlt className={styles.editIcon} onClick={() => editFunc(item.AccountID)}/></Link></td>
                        <td className={styles.t_td} > <MdDelete className={styles.deleteIcon} onClick={() => deleteFunc(item.AccountID)}/> </td>
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
