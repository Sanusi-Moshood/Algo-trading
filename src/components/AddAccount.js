import styles from '../pages/dashboard.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AccountSettings } from '../context/AccountSettings';


const AddAccount = () => {
  const {addAccount, CreatedAcc} = useContext(AccountSettings)
  const [validate, setValidate] =useState({
    ID:'',
    Key:'',
    secret:''
  })
const [saved, setSaved] = useState(false)
const [formData, setFormData] = useState({
  AccountID:'', 
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
  ApiKey:'',
  ApiSecret:''
})

const handleChange = (e) => {
  const {name, value, type, checked} = e.target
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked  : value.replaceAll(' ', '_')
  }))
}
const validateCheck = () => {
  if (formData.AccountID === '') {
    setValidate(p => ({
      ...p,
      ID: 'Account ID cannot be blank'
    }))
  }
  if (formData.ApiKey === '') {
    setValidate(p => ({
      ...p,
      Key: 'API KEY cannot be blank'
    }))
  }
  if (formData.ApiSecret === '') {
    setValidate(p => ({
      ...p,
      secret: 'API secret cannot be blank'
    }))
  }
}
const submit = (e) => {
  e.preventDefault();
  setValidate({
    ID:'',
    Key:'',
    secret:''
  })
  validateCheck()
  if (formData.AccountID  && formData.ApiKey && formData.ApiSecret != '') {
    addAccount(formData)
  }
}


  return (
    <div className={styles.viewWidth}>
              <h3 className={styles.back}><Link to={'/accounts'}> Back</Link></h3>
        
      <div className={styles.header}>
        <h1>Create a new Account</h1>
      </div>

      <div className={styles.body}>
        <form action="" className={styles.form} onSubmit={submit}>
        <div>
            <label className={styles.label}>Account ID</label> <br />
            <input 
              type="text" 
              placeholder='Account 1'
              name='AccountID' 
              value={formData.AccountID}
              onChange={handleChange}
              className={styles.addID} /> 
              <p className={styles.auth}>{validate.ID}</p>
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

            <div>
            <label className={styles.label}>Api Key</label> <br />
            <input 
              type="text" 
              placeholder='Account 1'
              name='ApiKey' 
              value={formData.ApiKey}
              onChange={handleChange}
              className={styles.addID} /> 
              <p className={styles.auth}>{validate.Key}</p>
          </div>

          <div>
            <label className={styles.label}>API SECRET</label> <br />
            <input 
              type="text" 
              placeholder='Account 1'
              name='ApiSecret' 
              value={formData.ApiSecret}
              onChange={handleChange}
              className={styles.addID} /> 
              <p className={styles.auth}>{validate.secret}</p>
          </div>
          {CreatedAcc && <p>Account Created successfully </p>}
            <div className={styles.submit}>
            <button>Save</button> 
            {/* <span>Reset</span> */}
            </div>
        </form>
        
      </div>

    </div>
  )
}

export default AddAccount
