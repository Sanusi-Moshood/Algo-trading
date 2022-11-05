import styles from '../pages/dashboard.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AccountSettings } from '../context/AccountSettings';


const AddAccount = () => {
  const {addAccount} = useContext(AccountSettings)
const [formData, setFormData] = useState({
  AccountID:'', 
  Enabled: false,
  EquityCNCEnabled: false,
  EquityMISEnabled: false,
  EquityStartTime: false,
  EquityEndTime: false,
  FnoCNCEnabled: false,
  FnoMISEnabled: false,
  FnoStartTime: false,
  FnoEndTime: false,
  CommodityCNCEnabled: false,
  CommodityMISEnabled: false,
  CommodityStartTime: false,
  CommodityEndTime: false,
  // startTime: moment(),
  // endTime: moment()

})

const handleChange = (e) => {
  const {name, value, type, checked} = e.target
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked  : value
  }))
}
const submit = (e) => {
  e.preventDefault();
  addAccount(formData)
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
