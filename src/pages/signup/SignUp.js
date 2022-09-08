import {useRef, useState} from 'react' 
import styles from './signup.module.css'
import signImg from '../../images/logbg.png'
import { HiOutlineMail } from 'react-icons/hi'
import { FaYoutube } from 'react-icons/fa'
import { SiTelegram } from 'react-icons/si'
import UserPool from '../../UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Forgotpass from './Forgotpass'


export default function SignUp() {
    const [signUp, setSignUp] = useState(false)
    const [isForgot, setIsForgot] = useState(false)
    const [LoginData, setLoginData] = useState(
        {username: "",email: "", password: "", ConfirmPassword: ""}
      )
      const name_check = useRef()
      const log_name_check = useRef()
      const password_check = useRef()
      const log_password_check = useRef()
      const conf_password_check = useRef()



      const handleForgot = () => {
        setIsForgot((prev) => !prev)
      }

      const handleChange =(event) => {
        setLoginData(prevLoginData => {
            return {
                ...prevLoginData,
                [event.target.name]: event.target.value
            }
        })
      }

    const toggleForm = (e) => {
        e.preventDefault();

        setSignUp(prev => !prev)
    }


    const handleSignSubmit = (e) => {
        e.preventDefault();
        const attributeList = [];
        attributeList.push(
            new CognitoUserAttribute({
              Name: 'email',
              Value: LoginData.email,
            })
          );
        UserPool.signUp(LoginData.username, LoginData.password, attributeList, null, (err, data) => {
            if (err) {
                console.error(err);
                signErrorCheck()
            }
            console.log(data);
        });
    }
    const handleLogSubmit = (e) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username: LoginData.email,
            Pool: UserPool
        })
        const authDetails = new AuthenticationDetails({
            Username: LoginData.email,
            Pool: UserPool
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log('onsuccess:', data)
            },
            onFailure: (err) => {
                console.log('onFailure:', err);
            },
            newPasswordRequired: (data) => {
                console.log('newPasswordRequired:', data)
            }
        })
    }

    
    const signErrorCheck = () => {


        var password_exp = new RegExp(/^[\S]+.*[\S]+$/) 
        var email_exp = new RegExp(/[\p{L}\p{M}\p{S}\p{N}\p{P}]+/)
        if (email_exp.test(LoginData.email) ){
            console.log('valid')
            
            
        }else {
            console.log('invalid');

            name_check.current.style.display = 'block'

            setTimeout(() => {
                name_check.current.style.display = 'none'   
            }, 5000);
        }

        if(password_exp.test(LoginData.password) ) {
            console.log('valid')
        } else {
            console.log('invalid');
            password_check.current.style.display = 'block'

            setTimeout(() => {
                password_check.current.style.display = 'none'  
            }, 5000);

        }
        if (LoginData.ConfirmPassword !== LoginData.password) {
            conf_password_check.current.style.display = 'block'

            setTimeout(() => {
                conf_password_check.current.style.display = 'none'
            }, 5000);
        }
      }


  return (
    <section>

        {
            isForgot ? <Forgotpass isForgot={isForgot} setIsForgot={setIsForgot}/> :


            <div className={styles.container}>
            <div className={styles.user}>
                <div className={styles.sign_img}>
                    <img src={signImg} alt="" />
                </div>
                <div className={styles.form_box}>
                    <div className={styles.form_wrapper}>
                        <div className={styles.auth_btn}>
                            <button onClick={toggleForm} className={ `${styles.toggle_btn} ${signUp ? styles.btn_light  : styles.btn_dark}`}>Sign up</button>
                            <button onClick={toggleForm} className={`${styles.toggle_btn}  ${!signUp ? styles.btn_light : styles.btn_dark }`}>Login</button>
                        </div>                        
                        <h1>{!signUp ? 'Create Account' : 'Login Account'}</h1>

                    {/*------------------ Toggle Sign Up Or Login Form-------------------- */}
                        {signUp ?
                        <form action="" onSubmit={handleLogSubmit}>
                        <input 
                            type="text"
                            placeholder='Username or E-mail'
                            onChange={handleChange}
                            name="email"
                            value={LoginData.email}
                        />
                        <p className={styles.auth} ref={log_name_check}>Please enter a valid Username or Email</p>
                        <input 
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            name="password"
                            value={LoginData.password}
                        />
                        <p className={styles.auth} ref={log_password_check}>Please enter a valid password</p>
                        <p className={styles.forgot} onClick={handleForgot}>Forgot password?</p>
                        <input type="submit" value="Login" />
                        
                        <p className={styles.log_in}>
                            Don't have Account? 
                            <a href="#" onClick={toggleForm}>Sign up</a>
                        </p>
                        </form>


                         :


                         <form action="" onSubmit={handleSignSubmit}>
                         <input 
                             type="text"
                             placeholder='Username or E-mail'
                             onChange={handleChange}
                             name="email"
                             value={LoginData.email}
                         />
                         <p className={styles.auth} ref={name_check}>Please enter a valid Username or Email</p>
                         <input 
                             type="password"
                             placeholder='Password'
                             onChange={handleChange}
                             name="password"
                             value={LoginData.password}
                         />
                         <p className={styles.auth} ref={password_check}>Please enter a valid Password</p>
                         <input 
                             type="password"
                             placeholder='Confirm password'
                             onChange={handleChange}
                             name="ConfirmPassword"
                             value={LoginData.ConfirmPassword}
                         />
                         <p className={styles.auth} ref={conf_password_check}>Password do not match</p>
                         
                         <input type="submit" value="Sign Up" />

                         <p className={styles.log_in}>
                             Already have an account?
                             <a href="#" onClick={toggleForm}>sign in</a>
                         </p>
                     </form>
                         
                         }


                        {/*------------------ Contact Links-------------------- */}
                        <div className={styles.sign_link}>
                            <div>
                                <HiOutlineMail />
                                <a href="#">
                                    Contact us
                                    <span></span>
                                </a>
                            </div>
                            <div>
                                <FaYoutube />
                                <a href="#">
                                    Subscribe us
                                    <span></span>
                                </a>
                            </div>
                            <div>
                                <SiTelegram />
                                <a href="#">
                                    Join us
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        }
    </section>
  )
}
