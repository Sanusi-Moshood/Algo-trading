import axios from 'axios'
import React, {createContext, useContext, useState, useEffect} from 'react'
import { AccountContext } from './Account';
import { redirect } from "react-router-dom";
const AccountSettings= createContext();


 const AccountSettingsContext = ({ children }) => {
  const {userData, status} = useContext(AccountContext)
  const [data, setData] = useState([])
  const [GroupsData, setGroupsData] = useState([])
 const [loading, setLoading] = useState(false)
 const [lloading, setLloading] = useState(true)
 const [EditAccountId, setEditAccountId] = useState('')
 const [EditGroupId, setEditGroupId] = useState('')
 const [CreatedAcc, setCreatedAcc] = useState('')
 const [CreatedGroup, setCreatedGroup] = useState('')
 const [LicenseData, setLicenseData] = useState()
 const [EquityCheck, setEquityCheck] = useState('')
 const [FnoCheck, setFnoCheck] = useState('')
 const [IdCheck, setIdCheck] = useState('')
 const [GIdCheck, setGIdCheck] = useState('')
 const [CommodityCheck, setCommodityCheck] = useState('')
 const [redirect, setRedirect] = useState(false)


useEffect(() => {
  if (status) {
    getAccountParams()
    getGroupsData()
    getLicenseData()
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
  .then((response) => {
    setCreatedGroup(true)
  getGroupsData()
  setTimeout(() => {
    setCreatedGroup(false)
  }, 20000)
  })
  .catch(
    (err) => {
      setCreatedAcc(false)
      const code = err.response.data;
      console.log(err);
      switch (code) {
            case 'failed: group already exists':
            setGIdCheck(' Group ID already exist')
            setTimeout(() => {
              setGIdCheck('')
            }, 20000)
            break;
          default:
              return false;
      }
    }
  )

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
            setEquityCheck('')
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
          .then(
            (response) => {
              console.log(response)
              getAccountParams()
              getAccountParams()
              setCreatedAcc(true)
            
            setTimeout(() => {
              setCreatedAcc(false)
            }, 20000)
            
            
            setRedirect(true)
            }
            )
          .catch(
            (err) => {
              setCreatedAcc(false)
              const code = err.response.data;
              console.log(err);
              switch (code) {
                  case  "Update account failed: Equity starttime cannot be less than endtime":
                    setEquityCheck('Equity starttime cannot be less than endtime')
                    setTimeout(() => {
                      setEquityCheck('')
                    }, 20000)
                    break;
                    case 'NotAuthorizedException':
                    setCommodityCheck(' Incorrect username or password.')
                    setTimeout(() => {
                      setCommodityCheck('')
                    }, 20000)
                    break;
                    case 'NotAuthorizedException':
                    setFnoCheck(' Incorrect username or password.')
                    setTimeout(() => {
                      setFnoCheck('')
                    }, 20000)
                    break;
                    case 'failed: group already exists':
                    setIdCheck(' Account ID already exist')
                    setTimeout(() => {
                      setIdCheck('')
                    }, 20000)
                    break;
                  default:
                      return false;
              }
            }
          )

      }


      const editFunc = (id) => {
        setEditAccountId(id)
      }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const getLicenseData =  async () => {
  setLloading(true)
try {
  const res =  await axios
  .get(
    `https://copytraderapi.fnoalgo.com/licence/licence/${userData.userId}`,
    {
      headers:{
        AccessToken: userData.accessToken,
        Userid: userData.userId
      }
    }
  )
  setLicenseData(res.data)
  // console.log(LicenseData)
  setLloading(false)
} catch(err) {
  console.log(`An error has occured: ${err}`)
}
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
          editGroupFunc,
          getLicenseData,
          LicenseData, setLicenseData,
          lloading,
          EquityCheck,
          FnoCheck,
          IdCheck,
          GIdCheck,
          CommodityCheck,
          redirect
          }}>
          {children}
        </AccountSettings.Provider>
      );
    };
    
    
    export { AccountSettingsContext, AccountSettings }