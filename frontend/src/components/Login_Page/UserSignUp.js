import React from 'react'
import './UserSignUp.css'
import {useSignUp} from '../../hooks/useSignUp'
import {useState} from "react"
import EmailIcon from './Login_Page_Image/email-1-svgrepo-com.svg';
import NameIcon from './Login_Page_Image/user-svgrepo-com.svg';
import LockIcon from "./Login_Page_Image/lock-alt-svgrepo-com.svg";

const UserSignup = ()=> {
    const [Name, setName] = useState('')
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const {signup, isLoading, error} = useSignUp()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await signup (email, password)

    }

  return (
    <div className='LoginContainer'>
        
        <div className='Header'>
        <div className='Text'> Sign Up</div>
        <div className='Underline'></div>    
        </div>
       
              <form className='UserInput' onSubmit={handleSubmit}>
                    <img src = {NameIcon} alt='Name'/>
                    <input type='text'onChange={(e)=> setName(e.target.value)} value={Name}
                    placeholder='Name'/>
            
                    <img src = {EmailIcon} alt='Email'/>
                    <input type='email' onChange={(e)=> setEmail(e.target.value)} value={email}/>

                    <img src = {LockIcon} alt='Password'/>
                    <input type='password'placeholder='Password'onChange={(e)=> setPassword(e.target.value)} value={password}/>
                
            <button disabled={isLoading} className='Submit'>Sign Up
            </button>
            {error && <div className='error'>{error}</div>}
       
        </form>
        <div className='ForgotPass'>Forgot Password? <span>Click Here</span></div>
        <div className='ForgotPass'>Login <span>Click Here</span></div>
    </div>
       
  )

}
export default UserSignup;