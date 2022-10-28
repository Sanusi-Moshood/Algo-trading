import axios from 'axios'
import React, {createContext, useContext, useState, useEffect} from 'react'
import { AccountContext } from './Account';
const AccountSettings= createContext();


 const AccountSettingsContext = ({ children }) => {
  const {userData, status} = useContext(AccountContext)
  const [data, setData] = useState([])
  const [AccountParams , setAccountParams] =useState({})
 const [loading, setLoading] = useState(false)
  



// useEffect(() => {
//   if (status) {
//     getAccountIds()
//     getAccountParams()
//   }

// }, [])

const getAccountParams =  async () => {
  setLoading(true)
  try {
    const res =  await axios
    .get(
      "https://copytraderapi.fnoalgo.com/accounts/accounts/1383/accounts",
      {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }
    )
    const params = res.data;
    setAccountParams([params])
    setLoading(false)
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
}
const getAccountIds =  async () => {
  setLoading(true)
  try {
    const res =  await axios
    .get(
      "https://copytraderapi.fnoalgo.com/accounts/accounts/1383/accounts/ids",
      {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }
    )
    const Ids = res.data;
    setData(Ids.accounts)
    setLoading(false)
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
}



      const addAccount = (formData) => {
          console.log(formData)

        setData((prev) => {
          return[
            {
              Id: formData.Id,
              AccountId: formData.Id,
              Enabled: formData.enabled,
              MisEnabled: formData.misEnabled,
              CncEnabled: formData.cncEnabled,
              FnoEnabled: formData.fnoEnabled,
              StartTime:formData.startTime,
              EndTime:formData.endTime,
              LoginStatus:'Active',
              LastLoginTime:'13-01-2004 3:45:00',
              LoginUrl:'URL'
            } ,
            ...prev

          ]
        })
      }



    return (
        <AccountSettings.Provider value={{data, setData, addAccount, AccountParams, loading, }}>
          {children}
        </AccountSettings.Provider>
      );
    };
    
    
    export { AccountSettingsContext, AccountSettings }