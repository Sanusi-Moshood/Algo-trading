import axios from 'axios'
import React, {createContext, useContext, useState, useEffect} from 'react'
import { AccountContext } from './Account';
const AccountSettings= createContext();


 const AccountSettingsContext = ({ children }) => {
  const {userData, status} = useContext(AccountContext)
  const [data, setData] = useState([])
  const [GroupsData, setGroupsData] = useState([])
 const [loading, setLoading] = useState(false)
 const [EditAccountId, setEditAccountId] = useState('')
 const [EditGroupId, setEditGroupId] = useState('')
 const [CreatedAcc, setCreatedAcc] = useState('')
 const [CreatedGroup, setCreatedGroup] = useState('')



useEffect(() => {
  if (status) {
    getAccountParams()
    getGroupsData()
  }

}, [])

///////////////////////////////////////GROUP PAGE APIS//////////////////////////////////////////////////////
const getGroupsData =  async () => {
  setLoading(true)
  try {
    const res =  await axios
    .get(
      `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/groups`,
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

const addGroup = (formData) => {

  axios.post(`https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/groups/${formData.GroupID}`, 
  {
    GroupID: formData.GroupID, 
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
    Members:formData.Members,
    MasterAccount:formData.MasterAccount
  },
  {
   headers:{
     AccessToken:userData.accessToken,
     Userid: userData.userId
   }
 }
  )  
  .then(setCreatedGroup(true),
  getGroupsData(),
  setTimeout(() => {
    setCreatedGroup(false)
  }, 5000))
  .catch(err => console.log(err));

}

const editGroupFunc = (id) => {
  setEditGroupId(id)
}

///////////////////////////////////////ACCOUNT PAGE APIS//////////////////////////////////////////////////////

const getAccountParams =  async () => {
  setLoading(true)
  try {
    const res =  await axios
    .get(
      `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/accounts`,
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
    // console.log(params)
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
            ApiKey:formData.ApiKey,
            ApiSecret:formData.ApiSecret
          },
          {
           headers:{
             AccessToken:userData.accessToken,
             Userid: userData.userId
           }
         }
          )  
          .then(setCreatedAcc(true),
            getAccountParams(),
          setTimeout(() => {
            setCreatedAcc(false)
          }, 5000))
          .catch(err => console.log(err));

      }


      const editFunc = (id) => {
        setEditAccountId(id)
      }


    return (
        <AccountSettings.Provider value={{
          data, 
          setData, 
          addAccount, 
          loading, 
          GroupsData,
          EditAccountId, 
          editFunc,
          getAccountParams,
          CreatedAcc,
          CreatedGroup,
          addGroup,
          setGroupsData,
          EditGroupId,
          editGroupFunc
          }}>
          {children}
        </AccountSettings.Provider>
      );
    };
    
    
    export { AccountSettingsContext, AccountSettings }