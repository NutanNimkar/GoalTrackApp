import React from 'react'
import './UserSignUp.css'
import { useSignUp } from '../../hooks/useSignUp'
import { useState } from "react"
import EmailIcon from '../../Images/Login_Page_Image/email-1-svgrepo-com.svg';
import NameIcon from '../../Images/Login_Page_Image/user-svgrepo-com.svg';
import LockIcon from "../../Images/Login_Page_Image/lock-alt-svgrepo-com.svg";
import Logo from "../../Images/Login_Page_Image/Logo_GoalTrack.PNG"

const UserSignup = () => {
  const [Name, setName] = useState('')
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const { signup, isLoading, error } = useSignUp()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(Name, email, password)

  }

  return (
    <div className='LoginContainer'>
      <div className='Logo'><img src={Logo} className='LogoIcon' alt='logo'></img></div>
      <div className='Header'>
        <div className='Text'> SIGN UP</div>
        <div className='Underline'></div>
      </div>

      <form className='UserInput' onSubmit={handleSubmit}>

        <div className='UsernameInput'>
          <img src={NameIcon} className='nameIcon' alt='Name' />
          <input type='text' onChange={(e) => setName(e.target.value)} value={Name}
            placeholder='Name' />
        </div>
        <div className='EmailInput'>
          <img src={EmailIcon} className='emailIcon' alt='Email' />
          <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' />
        </div>
        <div className='PasswordInput'>
          <img src={LockIcon} className='passwordIcon' alt='Password' />
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button disabled={isLoading} className='Submit'>CONTINUE
        </button>
        {error && <div className='error'>{error}</div>}

      </form>
      <div className='ForgotPass'>Forgot Password? <span>Click Here</span></div>
      <div className='ExistAccount'>Already Have An Account? <span>Click Here</span></div>
    </div>

  )

}
export default UserSignup;