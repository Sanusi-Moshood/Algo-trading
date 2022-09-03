import {useRef, useState} from 'react' 
import './signup.css'
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
        {email: "", password: "", ConfirmPassword: ""}
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

        UserPool.signUp(LoginData.email, LoginData.password, [], null, (err, data) => {
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
        }

        if(password_exp.test(LoginData.password) ) {
            console.log('valid')
        } else {
            console.log('invalid');
            password_check.current.style.display = 'block'

        }
        if (LoginData.ConfirmPassword !== LoginData.password) {
            conf_password_check.current.style.display = 'block'
        }
      }


  return (
    <section>

        {
            isForgot ? <Forgotpass isForgot={isForgot} setIsForgot={setIsForgot}/> :


            <div className="container">
            <div className="user">
                <div className="sign_img">
                    <img src={signImg} alt="" />
                </div>
                <div className="form_box">
                    <div className="form_wrapper">
                        <div className="auth_btn">
                            <button onClick={toggleForm} className={`toggle_btn ${signUp ? 'btn-light' : 'btn-dark' }`}>Sign up</button>
                            <button onClick={toggleForm} className={`toggle_btn ${!signUp ? 'btn-light' : 'btn-dark' }`}>Login</button>
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
                        <p className='auth' ref={log_name_check}>Please enter a valid Username or Email</p>
                        <input 
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            name="password"
                            value={LoginData.password}
                        />
                        <p className='auth' ref={log_password_check}>Please enter a valid password</p>
                        <p className='forgot' onClick={handleForgot}>Forgot password?</p>
                        <input type="submit" value="Login" />
                        
                        <p className='log_in'>
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
                         <p className='auth' ref={name_check}>Please enter a valid Username or Email</p>
                         <input 
                             type="password"
                             placeholder='Password'
                             onChange={handleChange}
                             name="password"
                             value={LoginData.password}
                         />
                         <p className='auth' ref={password_check}>Please enter a valid Password</p>
                         <input 
                             type="password"
                             placeholder='Confirm password'
                             onChange={handleChange}
                             name="ConfirmPassword"
                             value={LoginData.ConfirmPassword}
                         />
                         <p className='auth' ref={conf_password_check}>Password do not match</p>
                         
                         <input type="submit" value="Sign Up" />

                         <p className='log_in'>
                             Already have an account?
                             <a href="#" onClick={toggleForm}>sign in</a>
                         </p>
                     </form>
                         
                         }


                        {/*------------------ Contact Links-------------------- */}
                        <div className="sign_link">
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
