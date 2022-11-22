import styles from '../pages/dashboard.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { AccountSettings } from '../context/AccountSettings';
import { AccountContext } from '../context/Account';
import axios from 'axios'


const EditAccount = () => {
  const {userData} = useContext(AccountContext)
  const {EditAccountId, getAccountParams} = useContext(AccountSettings)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [EditFormData, setEditFormData] = useState({})


  const getEditData =  async (EditAccountId) => {
    setLoading(true)
  try {
    const res =  await axios
    .get(
      `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/accounts/${EditAccountId}`,
      {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }
    )
    const params = res.data;
    setEditFormData(params)
    setLoading(false)
  } catch(err) {
    console.log(`An error has occured: ${err}`)
  }
  }

  useEffect(() => {
    getEditData(EditAccountId)
  }, [])

const handleChange = (e) => {
  const {name, value, type, checked} = e.target
  setEditFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked  : value
  }))
}

const submit = (e) => {
  e.preventDefault();
 EditAccountPatch(EditFormData)
}

const EditAccountPatch =  async () => {
    setSaved(false)
    try {
      const res =  await axios
      .patch(
        `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}/accounts/${EditAccountId}`,
        {
          "FnoMISEnabled": EditFormData.FnoMISEnabled,
          "Enabled": EditFormData.Enabled,
          "FnoEndTime": EditFormData.FnoEndTime,
          "EquityStartTime": EditFormData.EquityStartTime,
          "FnoStartTime": EditFormData.FnoStartTime,
          "FnoCNCEnabled": EditFormData.FnoCNCEnabled,
          "CommodityEndTime": EditFormData.CommodityEndTime,
          "CommodityCNCEnabled": EditFormData.CommodityCNCEnabled,
          "EquityEndTime": EditFormData.EquityEndTime,
          "EquityMISEnabled": EditFormData.EquityMISEnabled,
          "CommodityMISEnabled": EditFormData.CommodityMISEnabled,
          "CommodityStartTime": EditFormData.CommodityStartTime,
          "EquityCNCEnabled": EditFormData.EquityCNCEnabled,
          // "ApiKey":EditFormData.ApiKey,
          // "ApiSecret":EditFormData.ApiSecret
       },
       {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }      
      ).then(getAccountParams(), setSaved(true),
      setTimeout(() => {
        setSaved(false)
      }, 5000))

    } catch(err) {
      console.log(`An error has occured: ${err}`)
    }
  }




  return (
    <div className={styles.viewWidth}>
              <h3 className={styles.back}><Link to={'/accounts'}> Back</Link></h3>
        
      <div className={styles.header}>
        <h1>Edit {EditAccountId}</h1>
      </div>

      <div className={styles.body}>
      {loading ? 'Loading.......' :(
                <form action="" className={styles.form} onSubmit={submit}>
          {/* <div>
            <label className={styles.label}>Api Key</label> <br />
            <input 
              type="text" 
              placeholder='Account 1'
              name='ApiKey' 
              value={EditFormData.ApiKey}
              onChange={handleChange}
              className={styles.addID} /> 
          </div>

          <div>
            <label className={styles.label}>API SECRET</label> <br />
            <input 
              type="text" 
              placeholder='Account 1'
              name='ApiSecret' 
              value={EditFormData.ApiSecret}
              onChange={handleChange}
              className={styles.addID} /> 
          </div> */}
                <div>
                      <input 
                        type="checkbox"  
                        id="Enabled" 
                        name='Enabled'
                        checked={EditFormData.Enabled}
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
                            checked={EditFormData.EquityCNCEnabled}
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
                            checked={EditFormData.EquityMISEnabled}
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
                      value={EditFormData.EquityStartTime}
                      onChange={handleChange}
                       />           
                    </div>
          
                    <div>
                      <label className={styles.label}>End time</label>
                      <input type="time"
                      step="1"
                       id=""
                       name="EquityEndTime" 
                       value={EditFormData.EquityEndTime}
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
                            checked={EditFormData.FnoCNCEnabled}
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
                            checked={EditFormData.FnoMISEnabled}
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
                      value={EditFormData.FnoStartTime}
                      onChange={handleChange}
                       />           
                    </div>
          
                    <div>
                      <label className={styles.label}>End time</label>
                      <input type="time"
                      step="1"
                       id=""
                       name="FnoEndTime" 
                       value={EditFormData.FnoEndTime}
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
                            checked={EditFormData.CommodityCNCEnabled}
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
                            checked={EditFormData.CommodityMISEnabled}
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
                      value={EditFormData.CommodityStartTime}
                      onChange={handleChange}
                       />           
                    </div>
          
                    <div>
                      <label className={styles.label}>End time</label>
                      <input type="time"
                      step="1"
                       id=""
                       name="CommodityEndTime" 
                       value={EditFormData.CommodityEndTime}
                       onChange={handleChange}
                       />    
                    </div>
                      </div>
                    </div>

                    {saved && <p>Changes successfully saved</p>}
                    <div className={styles.submit}>
                    <button>Save</button> 
                    {/* <span>Reset</span> */}
                    </div>
                </form>
      )}
        
      </div>

    </div>
  )
}

export default EditAccount
