import React from 'react'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import styles from '../pages/dashboard.module.css'
import { AccountContext } from '../context/Account'
const Userlevel = () => {
  const {userData, status} = useContext(AccountContext)
  const [formData, setFormData] = useState()
  // const [reload, setReload] = useState(false)
  
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    if (status) {
      getUserLevel();
    }
  }, [])
  

  const getUserLevel =  async () => {
    setLoading(true)
    try {
      const res =  await axios
      .get(
        `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}`,
        {
          headers:{
            AccessToken:userData.accessToken,
            Userid: userData.userId
          }
        }
      )
      const data = res.data;
      console.log(data)
      setFormData(data)
      setLoading(false)
    } catch(err) {
      console.log(`An error has occured: ${err}`)
    }
  }


  const handleChange = (e) => {
    const {name, value, type, checked} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked  : value
    }))
  }


  const patchUserLevel =  async () => {
    setSaved(false)
    try {
      const res =  await axios
      .patch(
        `https://copytraderapi.fnoalgo.com/accounts/accounts/${userData.userId}`,
        {
          "FnoMISEnabled": formData.FnoMISEnabled,
          "Enabled": formData.Enabled,
          "FnoEndTime": formData.FnoEndTime,
          "EquityStartTime": formData.EquityStartTime,
          "FnoStartTime": formData.FnoStartTime,
          "FnoCNCEnabled": formData.FnoCNCEnabled,
          "CommodityEndTime": formData.CommodityEndTime,
          "CommodityCNCEnabled": formData.CommodityCNCEnabled,
          "EquityEndTime": formData.EquityEndTime,
          "EquityMISEnabled": formData.EquityMISEnabled,
          "CommodityMISEnabled": formData.CommodityMISEnabled,
          "CommodityStartTime": formData.CommodityStartTime,
          "EquityCNCEnabled": formData.EquityCNCEnabled
       },
       {
        headers:{
          AccessToken:userData.accessToken,
          Userid: userData.userId
        }
      }      
      ).then(setSaved(true),
      setTimeout(() => {
        setSaved(false)
      }, 5000)
      )

    } catch(err) {
      console.log(`An error has occured: ${err}`)
    }
  }

  const submit = (e) => {
    e.preventDefault();

    patchUserLevel()
  }

  return (
    <div className={styles.viewWidth}>
      <h1>User Level</h1>
    {
      loading ? 'Loading........' : 
      (
        <form action="" className={styles.form} onSubmit={submit}>
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
              name="EquityStartTime" 
              value={formData.EquityStartTime}
              onChange={handleChange}
               />           
            </div>
  
            <div>
              <label className={styles.label}>End time</label>
              <input type="time"
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
              name="FnoStartTime" 
              value={formData.FnoStartTime}
              onChange={handleChange}
               />           
            </div>
  
            <div>
              <label className={styles.label}>End time</label>
              <input type="time"
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
              name="CommodityStartTime" 
              value={formData.CommodityStartTime}
              onChange={handleChange}
               />           
            </div>
  
            <div>
              <label className={styles.label}>End time</label>
              <input type="time"
               id=""
               name="CommodityEndTime" 
               value={formData.CommodityEndTime}
               onChange={handleChange}
               />    
            </div>
              </div>
            </div>
            {saved && <p>Changes successfully saved</p>} 
            <div className={styles.submit}>
            <button>Save</button> 
            <br />
            {/* <span>Reset</span> */}
            </div>
        </form>
        
      )
    }
    </div>
  )
}

export default Userlevel
