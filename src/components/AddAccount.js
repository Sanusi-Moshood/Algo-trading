import styles from '../pages/account.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import TimeRange from "react-time-range";
import moment from 'moment';
import { AccountSettings } from '../context/AccountSettings';


const AddAccount = () => {
  const {addAccount} = useContext(AccountSettings)
const [formData, setFormData] = useState({
  Id:'', 
  enabled: false,
  misEnabled: false,
  cncEnabled: false,
  fnoEnabled: false,
  startTime: '00:00',
  endTime: '00:00'
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
    <div className={styles.addContainer}>
      <div className={styles.header}>
        <h3 className={styles.back}><Link to={'/accounts'}> Back</Link></h3>
        
        <h1>Create a new Account</h1>
      </div>

      <div className={styles.body}>
        <form action="" className={styles.form} onSubmit={submit}>
          <div>
            <label className={styles.label}>Account ID</label> <br />
            <input 
              type="text" 
              placeholder='Account 1'
              name='Id' 
              value={formData.Id}
              onChange={handleChange} /> 
          </div>
 
          <div>
            <input 
              type="checkbox"  
              id="enabled" 
              name='enabled'
              checked={formData.enabled}
              onChange={handleChange}
              className={styles.toggle}
              /> 
            <label htmlFor="enabled">Enabled</label>           
          </div>

          <div>
          <input type="checkbox" 
          name="fnoEnabled" 
          checked={formData.fnoEnabled}
          onChange={handleChange}
          id="fnoEnabled" 
          className={styles.toggle}/> 
            <label htmlFor="fnoEnabled"> Fno Enabled</label>           
          </div>

          <div>
          <input type="checkbox" 
          name="cncEnabled" 
          checked={formData.cncEnabled}
          onChange={handleChange}
          id="cncEnabled" 
          className={styles.toggle}/> 
            <label htmlFor="cncEnabled"> CNC Enabled</label>            
          </div>

          <div>
          <input type="checkbox" 
          name="misEnabled" 
          checked={formData.misEnabled}
          onChange={handleChange}
          id="misEnabled" 
          className={styles.toggle}/> 
            <label htmlFor="misEnabled"> MIS Enabled</label>           
          </div>

          {/* <TimeRange
           onStartTimeChange={returnFunctionStart}
            onEndTimeChange={returnFunctionEnd}
            startMoment={formData.startTime}
            endMoment={formData.endTime}
        />    */}

          <div>
            <label className={styles.label} >Start time {formData.startTime}</label>
            <input type="time" 
            name="startTime" 
            value={formData.startTime}
            onChange={handleChange}
             />           
          </div>

          <div>
            <label className={styles.label}>End time</label>
            <input type="time"
             id=""
             name="endTime" 
             value={formData.endTime}
             onChange={handleChange}
             />    
          </div>
          <button className={styles.add_account}>Add Account</button>
        </form>

        
      </div>

    </div>
  )
}

export default AddAccount
