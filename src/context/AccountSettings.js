import axios from 'axios'
import React, {createContext, useContext, useState, useEffect} from 'react'
import { AccountContext } from './Account';
const AccountSettings= createContext();


 const AccountSettingsContext = ({ children }) => {
  const {userData, status} = useContext(AccountContext)
  const [data, setData] = useState([])
  const [GroupsData, setGroupsData] = useState([])
 const [loading, setLoading] = useState(false)
  



useEffect(() => {
  if (status) {
    // getAccountIds()
    getAccountParams()
    getGroupsData()
  }

}, [])

const getGroupsData =  async () => {
  setLoading(true)
  try {
    const res =  await axios
    .get(
      `https://copytraderapi.fnoalgo.com/accounts/accounts/1383/groups`,
      {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }
    )
    const params = res.data;
    setGroupsData(params)
    setLoading(false)
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
}
const getAccountParams =  async () => {
  setLoading(true)
  try {
    const res =  await axios
    .get(
      `https://copytraderapi.fnoalgo.com/accounts/accounts/1383/accounts`,
      {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }
    )
    const params = res.data;
    setData(params)
    setLoading(false)
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
}




      const addAccount = (formData) => {

          axios.post(`https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/accounts/${formData.AccountID}`, 
          {
            AccountID: formData.AccountID, 
            Enabled: formData.Enabled,
            EquityCNCEnabled: formData.EquityCNCEnabled,
            EquityMISEnabled: formData.EquityMISEnabled,
            EquityStartTime: formData.EquityStartTime,
            EquityEndTime: formData.EquityEndTime,
            FnoCNCEnabled: formData.FnoCNCEnabled,
            FnoMISEnabled: formData.FnoMISEnabled,
            FnoStartTime: formData.FnoStartTime,
            FnoEndTime: formData.FnoEndTime,
            CommodityCNCEnabled: formData.CommodityCNCEnabled,
            CommodityMISEnabled: formData.CommodityMISEnabled,
            CommodityStartTime: formData.CommodityStartTime,
            CommodityEndTime: formData.CommodityEndTime,
          }
          )
          .then(res => console.log(res))
          .catch(err => console.log(err));

        setData((prev) => {
          return[
            {
              AccountID: formData.AccountID, 
              Enabled: formData.Enabled,
              EquityCNCEnabled: formData.EquityCNCEnabled,
              EquityMISEnabled: formData.EquityMISEnabled,
              EquityStartTime: formData.EquityStartTime,
              EquityEndTime: formData.EquityEndTime,
              FnoCNCEnabled: formData.FnoCNCEnabled,
              FnoMISEnabled: formData.FnoMISEnabled,
              FnoStartTime: formData.FnoStartTime,
              FnoEndTime: formData.FnoEndTime,
              CommodityCNCEnabled: formData.CommodityCNCEnabled,
              CommodityMISEnabled: formData.CommodityMISEnabled,
              CommodityStartTime: formData.CommodityStartTime,
              CommodityEndTime: formData.CommodityEndTime,
            } ,
            ...prev

          ]
        })
      }



    return (
        <AccountSettings.Provider value={{data, setData, addAccount, loading, GroupsData}}>
          {children}
        </AccountSettings.Provider>
      );
    };
    
    
    export { AccountSettingsContext, AccountSettings }