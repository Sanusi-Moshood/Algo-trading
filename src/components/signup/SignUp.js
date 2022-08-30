import React from 'react' 
import './signup.css'
import signImg from '../../images/logbg.png'
import { HiOutlineMail } from 'react-icons/hi'
import { FaYoutube } from 'react-icons/fa'
import { SiTelegram } from 'react-icons/si'

export default function SignUp() {
  return (
    <section>
        <div className="container">
            <div className="user">
                <div className="sign_img">
                    <img src={signImg} alt="" />
                </div>
                <div className="form_box">
                    <div className="form_wrapper">
                        <div className="auth_btn">
                            <button>Sign up</button>
                            <button>Login</button>
                        </div>
                        <h1>Create Account</h1>
                        <form action="">
                            <input 
                                type="text"
                                placeholder='E-mail'
                            />
                            <input 
                                type="password"
                                placeholder='Password'
                            />
                            <input 
                                type="password"
                                placeholder='Confirm password'
                            />
                            <p className='log_in'>
                                Already have an account?
                                <a href="#">sign in</a>
                            </p>
                            <input type="submit" value="Sign Up" />
                        </form>
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
    </section>
  )
}
