import React from 'react'
import './UserLogin.css'
import {useLogin} from '../../hooks/useLogin'
import {useState} from "react"
import EmailIcon from './Login_Page_Image/email-1-svgrepo-com.svg';
import LockIcon from "./Login_Page_Image/lock-alt-svgrepo-com.svg";

const UserLogin = ()=> {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await login (email, password)

    }

  return (
    <div className='LoginContainer'>
        
        <div className='Header'>
        <div className='Text'> Login</div>
        <div className='Underline'></div>    
        </div>
       
              <form className='UserInput' onSubmit={handleSubmit}>
                   <div className='EmailInput'>
                    <img src = {EmailIcon} alt='Email'/>
                    <input type='email' placeholder='Email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
                  </div>
                  <div className='PasswordInput'>
                    <img src = {LockIcon} alt='Password'/>
                    <input type='password'placeholder='Password'onChange={(e)=> setPassword(e.target.value)} value={password}/>
                </div>
            <button disabled = {isLoading} className='Submit'>Login </button>
            {error && <div className='error'>{error}</div>}
       
        </form>
        <div className='ForgotPass'>Forgot Password? <span>Click Here</span></div>
        <div className='CreateAccount'>Create New Account <span>Click Here</span></div>
    </div>
       
  )

}
export default UserLogin;