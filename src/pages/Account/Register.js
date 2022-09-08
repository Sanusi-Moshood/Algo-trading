import styles from './signup.module.css'
import signImg from '../../images/logbg.png'
import { HiOutlineMail } from 'react-icons/hi'
import { FaYoutube } from 'react-icons/fa'
import { SiTelegram } from 'react-icons/si'
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useState, useContext } from 'react';
import UserPool from '../../UserPool';
import { Link } from 'react-router-dom'
import { AccountContext } from '../../context/Account';
 

function Register() {
  const { setStatus } = useContext(AccountContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [ConfirmPasswordCheck, setConfirmPasswordCheck] = useState('');
    const [name_check, setNameCheck] = useState('')
    const [email_check, setEmailCheck] = useState('')
    const [password_check, setpasswordCheck] = useState('')
  

    const validation = () => {
      return new Promise((resolve, reject) => {
        if( username === ''){
          setNameCheck('username can not be blank') 
        } 
        if( username.length < 5){
          setNameCheck('username too short') 
        } 

        if(email === ''){
          setEmailCheck('Email cannot be blank')
        }
        if(email.search(/[@]/g) < 0){
          setEmailCheck('Email not valid')
        }


        if(password === ''){
          setpasswordCheck('Password cannot be blank')
        }else if (password < 8) {
          setpasswordCheck('password too short')
        }else if (password.search(/[A-Z]/g) < 0) {
          setpasswordCheck('Password must contain Uppercase')
        }else if (password.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]).*$/) < 0) {
          setpasswordCheck('Password must contain a special character')
        }else if (password.search(/[0-9]/) < 0) {
          setpasswordCheck('Password must contain a digit')
        }else if (password !== ConfirmPassword) {
          setConfirmPasswordCheck('Password does not match')
        }else if (password === ConfirmPassword) {
          setConfirmPasswordCheck('')
        }
      });
    };


    const onSubmit = (e) => {
      e.preventDefault();
      setEmailCheck('')
      setNameCheck('')
      setpasswordCheck('')
      validation()

      if (ConfirmPassword === password  && password !== ''){
        const attributeList = [];
        attributeList.push(
          new CognitoUserAttribute({
            Name: 'email',
            Value: email,
          })
        );
        UserPool.signUp(username, password, attributeList, null, (err, data) => {
          if (err) {
            console.log(err);
            const code = err.code;
            console.log(err);
            switch (code) {
                case 'UsernameExistsException':
                  setNameCheck('username already exist')
                case 'Network error':
                  alert('please connect to internet')
                default:
                    return false;
            }
          } else {
            console.log(data);
            alert('User Added Successfully');
            setStatus(true)
          }
        });
      }

    };
  


  
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <div className={styles.sign_img}>
                </div>
                <div className={styles.form_box}>
                    <div className={styles.form_wrapper}>
                        <div className={styles.auth_btn}>
                            <Link to='/register'  className={ `${styles.toggle_btn} ${ styles.btn_dark}`}>Sign up</Link>
                            <Link to='/'  className={`${styles.toggle_btn}  ${ styles.btn_light}`}>Login</Link>
                        </div>                        
                            <h1>Create Account</h1>
                            <form onSubmit={onSubmit}>
                                     
                                     <input
                                       type="text"
                                       placeholder='UserName:'
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                     />
                                     <p className={styles.auth}>{name_check}</p>
                                     <input
                                       type="text"
                                       placeholder='Email:'
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                     />
                                     <p className={styles.auth}>{email_check}</p>
                                     <input
                                       type="password"
                                       placeholder='Password:'
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                     />
                                     <p className={styles.auth}>{password_check}</p>
                                     <input
                                       type="password"
                                       placeholder='Confirm Password:'
                                       value={ConfirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                     />
                                     <p className={styles.auth} >{ConfirmPasswordCheck}</p>
                                     <button className={styles.Submit}>SignUp</button>
                                     
                            </form>
                            <p className={styles.log_in}>
                                         Already have an account?
                                        <Link to="/" >sign in</Link>
                                    </p>
                        {/*------------------ Contact Links-------------------- */}
                        <div className={styles.sign_link}>
                            <a href='#' >
                                <HiOutlineMail className={styles.social} />
                                <div>
                                    Contact 
                                </div>
                                <span></span>
                            </a>
                            <a href='#' >
                                <FaYoutube className={styles.social} />
                                <div>
                                    Subscribe 
                                </div>
                                <span></span>
                            </a>
                            <a href='#' >
                                <SiTelegram className={styles.social} />
                                <div>
                                    Join 
                                </div>
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Register;