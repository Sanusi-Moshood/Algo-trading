import React, { useState,} from 'react'
import styles from './signup.module.css'
import { Link } from 'react-router-dom'
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../UserPool';


const Forgotpass = (props) => {
  const [Linksent, setLinkSent] = useState(1)
  const [passwordReset, setPasswordReset] = useState(1)
  const [password_check, setpasswordCheck] = useState('')
  const [OTP_check, setOTPCheck] = useState('')
  const [ConfirmPasswordCheck, setConfirmPasswordCheck] = useState('');
  const [Username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');


const getUser = () => {
  return new CognitoUser({
    Username: Username.toLowerCase(),
    Pool: UserPool
  })
}


  const sendCode = (e) => {
  e.preventDefault(); 

  getUser().forgotPassword({
    onSuccess : data => {
      console.log('onsuccess', data)
    },
    onFailure : err => {
      console.log('onsuccess', err)
    },
    inputVerificationCode: data => {
      console.log('Input code', data);
      setLinkSent(2)
    }
  })
  }

  const validation = () => {
    return new Promise((resolve, reject) => {
      if(code === ''){
        setOTPCheck('OTP cannot be blank')
      }

      if(password === ''){
        setpasswordCheck('Password cannot be blank')
      }else if (password.length < 8) {
        setpasswordCheck('password too short')
      }else if (password.search(/[A-Z]/g) < 0) {
        setpasswordCheck('Password must contain Uppercase')
      }else if (password.search(/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?_₹]).*$/) < 0) {
        setpasswordCheck('Password must contain a special character')
      }else if (password.search(/[0-9]/g) < 0) {
        setpasswordCheck('Password must contain a digit')
      }else if (password !== ConfirmPassword) {
        setConfirmPasswordCheck('Password does not match')
      }else if (password === ConfirmPassword) {
        setConfirmPasswordCheck('')
      }
    });
  };
  
  function changePassword(e) {
     e.preventDefault(); 
    validation()
    if (password === ConfirmPassword){
      getUser().confirmPassword(code, password,{
        onSuccess : data => {
          console.log('onsuccess', data)
          setLinkSent(1)
          setPasswordReset(2)
        },
        onFailure : err => {
          const code = err.code;
          console.log(err);
          switch (code) {
              case 'ExpiredCodeException':
                setOTPCheck('Expired code provided, please request a code again.')
                break
              case 'CodeMismatchException':
                setOTPCheck('Invalid verification code provided, please try again..')
                break
              default:
                  return false;
          }
        },
      })
    }

  }
 


  
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles['forgot-box']}>{
          Linksent === 2 &&  <p className={styles['reset-link-msg']} >An OTP Verification code has been sent to your email address </p>
        }
        {
          passwordReset === 2 &&  <p className={styles['reset-link-msg']} >Password reset successful, please login to continue </p>
        }
            
            {
              Linksent === 1 &&(
                <>
                <h1>Enter your Username to reset your password</h1>
                <form action="" onSubmit={sendCode}>
                <input 
                   type="text"
                   placeholder='Username'
                   onChange={(e) => setUsername(e.target.value)}
                   name="Username"
                   value={Username}
                   className={styles['forgot-mail']}
                            /> 
                <input type="submit" placeholder='Send Verification Code' className={styles['forgot-btn']}/>
                </form>
                </>

              ) }

            {
              (
                Linksent === 2 &&
                <form action="" onSubmit={changePassword}>
                <input 
                   type="number"
                   placeholder='OTP'
                   onChange={(e) => setCode(e.target.value)}
                   name="code"
                   value={code}
                   className={styles['forgot-mail']}
                            /> 
                            <p className={styles.auth}>{OTP_check}</p>
                <input 
                   type="password"
                   placeholder='New Password'
                   onChange={(e) => setPassword(e.target.value)}
                   name="password"
                   value={password}
                   className={styles['forgot-mail']}
                            /> 
                   <p className={styles.auth}>{password_check}</p>
                <input 
                   type="password"
                   placeholder='Confirm Password'
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   name="confirmPassword"
                   value={ConfirmPassword}
                   className={styles['forgot-mail']}
                            /> 
                            <p className={styles.auth} >{ConfirmPasswordCheck}</p>
                <input type="submit" placeholder='Change Password' className={styles['forgot-btn']}/>
                </form>
              )
            }

            

          <Link to={'/'} className={styles['b-t-lp']}>back to <span>Login</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Forgotpass
