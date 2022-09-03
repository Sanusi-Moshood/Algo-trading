import React, { useRef, useState } from 'react'
import './signup.css'

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
    <div className='container'>
      <div className="user">
        <div className="forgot-box">
            <p className='reset-link-msg' ref={resetMsg}>A reset link has been sent to your email address </p>
            <h1>Enter your E-mail address to reset password</h1>

            <form action="" onSubmit={handlesbmit}>
            <input 
               type="email"
               placeholder='Username or E-mail'
               onChange={change}
               name="email"
               value={ResetData.email}
               className='forgot-mail'
                        /> <br />
            <input type="submit" placeholder='Reset Password' className='forgot-btn'/>
            </form>

          <p onClick={toggle_forgot} className='b-t-lp'>back to <span>Login</span></p>
        </div>
      </div>
    </div>
  )
}

export default Forgotpass
