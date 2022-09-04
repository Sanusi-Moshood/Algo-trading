import React, { useRef, useState } from 'react'
import styles from './signup.module.css'

const Forgotpass = (props) => {

  const [ResetData, setResetData] = useState({email: ""} )
  const resetMsg = useRef()


  const toggle_forgot =() =>{
  props.setIsForgot((prev) => !prev)
  }

  const handlesbmit = (e) => {
  e.preventDefault();
  resetMsg.current.style.display='block'
  resetMsg.current.style.top='0'
 
  }

  const change = (event) => {
    setResetData(prevData => {
      return {
          ...prevData,
          [event.target.name]: event.target.value
      }
  })
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles['forgot-box']}>
            <p className={styles['reset-link-msg']} ref={resetMsg}>A reset link has been sent to your email address </p>
            <h1>Enter your E-mail address to reset password</h1>

            <form action="" onSubmit={handlesbmit}>
            <input 
               type="email"
               placeholder='Username or E-mail'
               onChange={change}
               name="email"
               value={ResetData.email}
               className={styles['forgot-mail']}
                        /> <br />
            <input type="submit" placeholder='Reset Password' className={styles['forgot-btn']}/>
            </form>

          <p onClick={toggle_forgot} className={styles['b-t-lp']}>back to <span>Login</span></p>
        </div>
      </div>
    </div>
  )
}

export default Forgotpass
