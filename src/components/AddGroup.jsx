import styles from '../pages/dashboard.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AccountSettings } from '../context/AccountSettings';
import { useEffect } from 'react';
import axios from 'axios'
import { AccountContext } from '../context/Account';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";


const AddGroup = () => {
  const {userData} = useContext(AccountContext)
  const {addGroup, CreatedGroup, GIdCheck, GRedirect, setGRedirect} = useContext(AccountSettings)
  const [validate, setValidate] =useState({
    ID:'',
    Accounts:'',
    Master:''
  })

  const navigate = useNavigate();

useEffect(() => {
  if (GRedirect) {
    
    navigate(-1);
    setGRedirect(false)

  }
}, );


const [formData, setFormData] = useState({
  GroupID:'', 
  Enabled: false,
  EquityCNCEnabled: false,
  EquityMISEnabled: false,
  EquityStartTime: "00:00:00",
  EquityEndTime: "00:00:00",
  FnoCNCEnabled: false,
  FnoMISEnabled: false,
  FnoStartTime: "00:00:00",
  FnoEndTime: "00:00:00",
  CommodityCNCEnabled: false,
  CommodityMISEnabled: false,
  CommodityStartTime: "00:00:00",
  CommodityEndTime: "00:00:00",
  Members:[],
    MasterAccount:[]
})
const handleChange = (e) => {
  const {name, value, type, checked} = e.target
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked  : value.replaceAll(' ', '_')
  }))
}
const validateCheck = () => {
  if (formData.GroupID === '') {
    setValidate(p => ({
      ...p,
      ID: 'Group ID cannot be blank'
    }))
  }
  if (formData.Members.length === 0) {
    setValidate(p => ({
      ...p,
      Accounts: 'Groups must have a minimum of 1 account'
    }))
  }
  if (formData.MasterAccount === '') {
    setValidate(p => ({
      ...p,
      Master: 'Please select a master account'
    }))
  }
}
const submit = (e) => {
  e.preventDefault();
  setValidate({
    ID:'',
    Accounts:'',
    Master:''
  })
  validateCheck()
  if (formData.GroupID && formData.MasterAccount !== '' && formData.Members.length !== 0) {
    addGroup(formData)
  }
}

const [AccountData, setAccountData] = useState([])


const getAccountsData =  async () => {
  // setLoading(true)
  try {
    const res =  await axios
    .get(
      `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/accounts/ids`,
      {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }
    )
    const params = res.data;
    setAccountData(params.accounts)
    // setLoading(false)
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
}

useEffect(() => {
  getAccountsData()
}, [getAccountsData])

const options = AccountData.map(ID => (
  {value: ID, label: ID }
))
const [selectedAccounts, setSelectedAccounts] = useState()

const selectChange = (e) => {
        setSelectedAccounts(e)
        
       var member = Array.isArray(e)? e.map(ID => ID.label) : []

        setFormData(prev => ({
          ...prev,
          Members: member
        }))

}



const options2 = Array.isArray(selectedAccounts)? selectedAccounts.map(ID => (
  {value: ID.value, label: ID.label }
)) : []

const MasterChange = (e) => {  
 var master = e.label

  setFormData(prev => ({
    ...prev,
    MasterAccount: master
  }))
  console.log(formData.MasterAccount);
}



  return (
    <div className={styles.viewWidth}>
              <h3 className={styles.back}><Link to={'/groups'}> Back</Link></h3>
        
      <div className={styles.header}>
        <h1>Create a new Group</h1>
      </div>

      <div className={styles.body}>
        <form action="" className={styles.form} onSubmit={submit}>
        <div>
            <label className={styles.label}>Group ID</label> <br />
            <input 
              type="text" 
              placeholder='Group_1'
              name='GroupID' 
              value={formData.GroupID}
              onChange={handleChange}
              className={styles.addID} /> 
              <p className={styles.auth}>{GIdCheck}</p>
              <p className={styles.auth}>{validate.ID}</p>
        </div>

        <div>
        <label className={styles.label}>Select group members</label> <br />
        <Select options={options}
            isMulti
            name="colors"
            className="basic-multi-select Multiselect"
            classNamePrefix="select"
            onChange={selectChange}
        />
        <p className={styles.auth}>{validate.Accounts}</p> 
        </div>
        <div>
        <label className={styles.label}>Select master account</label> <br />

        <Select options={options2}
            name="colors"
            className="basic-multi-select Multiselect"
            classNamePrefix="select"
            onChange={MasterChange}
        />
        <p className={styles.auth}>{validate.Master}</p> 
        </div>


        <div>
              <input 
                type="checkbox"  
                id="Enabled" 
                name='Enabled'
                checked={formData.Enabled}
                onChange={handleChange}
                className={styles.toggle}
                /> 
              <label htmlFor="Enabled">Enabled</label>           
            </div>
  
            
  
            <div className={styles.box_container}>
  
              <div className={styles.box}>
                <h2>Equity</h2>
  
                <div>
                 <input 
                    type="checkbox"  
                    id="EquityCNCEnabled" 
                    name='EquityCNCEnabled'
                    checked={formData.EquityCNCEnabled}
                    onChange={handleChange}
                    className={styles.toggle}
                  /> 
                  <label htmlFor="EquityCNCEnabled">NRML</label>           
                </div>
                <div>
                  <input 
                    type="checkbox"  
                    id="EquityMISEnabled" 
                    name='EquityMISEnabled'
                    checked={formData.EquityMISEnabled}
                    onChange={handleChange}
                    className={styles.toggle}
                  /> 
                  <label htmlFor="EquityMISEnabled">MIS</label>           
                </div>
                <div>
              <label className={styles.label} >Start time</label>
              <input type="time"
              step="1" 
              name="EquityStartTime" 
              value={formData.EquityStartTime}
              onChange={handleChange}
               />           
            </div>
  
            <div>
              <label className={styles.label}>End time</label>
              <input type="time"
              step="1"
               id=""
               name="EquityEndTime" 
               value={formData.EquityEndTime}
               onChange={handleChange}
               />    
            </div>
              </div>
  
  
              <div className={styles.box}>
                <h2>FNO</h2>
  
                <div>
                 <input 
                    type="checkbox"  
                    id="FnoCNCEnabled" 
                    name='FnoCNCEnabled'
                    checked={formData.FnoCNCEnabled}
                    onChange={handleChange}
                    className={styles.toggle}
                  /> 
                  <label htmlFor="FnoCNCEnabled">NRML</label>           
                </div>
                <div>
                  <input 
                    type="checkbox"  
                    id="FnoMISEnabled" 
                    name='FnoMISEnabled'
                    checked={formData.FnoMISEnabled}
                    onChange={handleChange}
                    className={styles.toggle}
                  /> 
                  <label htmlFor="FnoMISEnabled">MIS</label>           
                </div>
  
                <div>
              <label className={styles.label} >Start time</label>
              <input type="time"
              step="1" 
              name="FnoStartTime" 
              value={formData.FnoStartTime}
              onChange={handleChange}
               />           
            </div>
  
            <div>
              <label className={styles.label}>End time</label>
              <input type="time"
              step="1"
               id=""
               name="FnoEndTime" 
               value={formData.FnoEndTime}
               onChange={handleChange}
               />    
            </div>
              </div>
  
  
              <div className={styles.box}>
                <h2>Commodity</h2>
  
                <div>
                 <input 
                    type="checkbox"  
                    id="CommodityCNCEnabled" 
                    name='CommodityCNCEnabled'
                    checked={formData.CommodityCNCEnabled}
                    onChange={handleChange}
                    className={styles.toggle}
                  /> 
                  <label htmlFor="CommodityCNCEnabled">NRML</label>           
                </div>
                <div>
                  <input 
                    type="checkbox"  
                    id="CommodityMISEnabled" 
                    name='CommodityMISEnabled'
                    checked={formData.CommodityMISEnabled}
                    onChange={handleChange}
                    className={styles.toggle}
                  /> 
                  <label htmlFor="CommodityMISEnabled">MIS</label>           
                </div>
  
                <div>
              <label className={styles.label} >Start time</label>
              <input type="time"
              step="1" 
              name="CommodityStartTime" 
              value={formData.CommodityStartTime}
              onChange={handleChange}
               />           
            </div>
  
            <div>
              <label className={styles.label}>End time</label>
              <input type="time"
              step="1"
               id=""
               name="CommodityEndTime" 
               value={formData.CommodityEndTime}
               onChange={handleChange}
               />    
            </div>
              </div>
            </div>

          {CreatedGroup && <p>Group Created successfully </p>}
            <div className={styles.submit}>
            <button>Save</button> 
            {/* <span>Reset</span> */}
            </div>
        </form>
        
      </div>

    </div>
  )
}

export default AddGroup
