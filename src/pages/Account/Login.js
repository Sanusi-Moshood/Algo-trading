import { useContext, useState } from 'react';
import  { AccountContext } from '../../context/Account'
import styles from './signup.module.css'
import { HiOutlineMail } from 'react-icons/hi'
import { FaYoutube } from 'react-icons/fa'
import { SiTelegram } from 'react-icons/si'
import { Link } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email_check, setEmailCheck] = useState('')
  
    const { authenticate } = useContext(AccountContext);
  
    const onSubmit = (e) => {
      e.preventDefault();
      authenticate(username, password)
        .then((result) => {
         
          window.location.reload();
        })
        .catch((err) => {
          const code = err.code;
          console.log(err);
          switch (code) {
              case 'InvalidParameterException':
                setEmailCheck('Please enter a valid Username or Email')
              case 'NotAuthorizedException':
                setEmailCheck(' Incorrect username or password.')
                break;
              default:
                  return false;
          }
        });
    };
  
    return (
      <div>
        <div className={styles.container}>
            <div className={styles.user}>
                <div className={styles.sign_img}>
                </div>
                <div className={styles.form_box}>
                    <div className={styles.form_wrapper}>
                        <div className={styles.auth_btn}>
                            <Link to='/register'  className={ `${styles.toggle_btn}   ${ styles.btn_light}`}>Sign up</Link>
                            <Link to='/'  className={`${styles.toggle_btn}  ${ styles.btn_dark}`}>Login</Link>
                        </div>                        
                            <h1>Login Account</h1>
                            <form onSubmit={onSubmit}>
                            <p className={styles.auth}>{email_check}</p>
                              <input
                                type="text"
                                placeholder='UserName or Email'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              
                              
                              <input
                                type="password"
                                placeholder='Password:'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                               <Link to={'/forgot_password'} className={styles.forgot}>Forgot password?</Link>
                               <button className={styles['Submit']}>Login</button>
                            </form>
                            <p className={styles.log_in}>
                                         Don't have Account?
                                        <Link to="/register" >signUp</Link>
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
      </div>
    );
  }
  
  export default Login;