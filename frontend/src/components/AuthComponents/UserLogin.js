import React from 'react'
import './UserLogin.css'
import {useLogin} from '../../hooks/useLogin'
import {useState} from "react"
import EmailIcon from '../../Images/Login_Page_Image/email-1-svgrepo-com.svg';
import LockIcon from "../../Images/Login_Page_Image/lock-alt-svgrepo-com.svg";
import Logo from "../../Images/Login_Page_Image/Logo_GoalTrack.PNG"


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
        
        <div className='LogoPic'><img src ={Logo} className='LogoIcon' alt='Logo'></img></div>
        <div className='Header'>
        <div className='Text'> LOGIN</div>
        <div className='Underline'></div>    
        </div>
       
              <form className='UserInput' onSubmit={handleSubmit}>
                   <div className='EmailInput'>
                    <img src = {EmailIcon} className='EmailIcon' alt='Email'/>
                    <input type='email' placeholder='Email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
                  </div>
                  <div className='PasswordInput'>
                    <img src = {LockIcon} className='PasswordIcon' alt='Password'/>
                    <input type='password'placeholder='Password'onChange={(e)=> setPassword(e.target.value)} value={password}/>
                </div>
            <button disabled = {isLoading} className='Submit'>CONTINUE </button>
            {error && <div className='error'>{error}</div>}
       
        </form>
        <div className='ForgotPass'>Forgot Password? <span >Click Here</span></div>
        <div className='CreateAccount'>Create New Account <span>Click Here</span></div>
    </div>
       
  )

}
export default UserLogin;

// VerticalNavigationTest
// /* :root {
//     font-size: 16px;
//     font-family: 'Open Sans';
//     --text-primary: #b6b6b6;
//     --text-secondary: #ececec;
//     --bg-primary: #23232e;
//     --bg-secondary: #141418;
//     --transition-speed: 600ms;
//   }
  
//   body {
//     color: black;
//     background-color: white;
//     margin: 0;
//     padding: 0;
//   }
  
//   body::-webkit-scrollbar {
//     width: 0.25rem;
//   }
  
//   body::-webkit-scrollbar-track {
//     background: #1e1e24;
//   }
  
//   body::-webkit-scrollbar-thumb {
//     background: #6649b8;
//   }
  
//   main {
//     margin-left: 5rem;
//     padding: 1rem;
//   }
  
//   .navbar {
//     position: fixed;
//     background-color: var(--bg-primary);
//     transition: width 600ms ease;
//     overflow: scroll;
//   }
  
//   .navbar-nav {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     height: 100%;
//   }
  
  
//   .nav-item:last-child {
//     margin-top: auto;
//   }
  
//   .nav-item {
//     display: flex;
//     align-items: center;
//     flex-direction: row;
//     height: 5rem;
//     width: 100%;
//     color: var(--text-primary);
//     text-decoration: none;
//     filter: grayscale(100%) opacity(0.7);
//     transition: var(--transition-speed);
//     border-radius: 20%;
//   }
  
//   .nav-item:hover {
//     filter: grayscale(0%) opacity(1);
//     background: var(--bg-secondary);
//     color: var(--text-secondary);
//   }
  
//   .link-text {
//     display: none;
//     margin-left: 1rem;
//   }
  
//   .nav-link svg {
//     width: 2rem;
//     min-width: 2rem;
 
//   }
  
//   .fa-primary {
//     color: #ff7eee;
//   }
  
//   .fa-secondary {
//     color: #df49a6;
//   }
  
//   .fa-primary,
//   .fa-secondary {
//     transition: var(--transition-speed);
//   }
  
//   .logo {
//     font-weight: bold;
//     text-transform: uppercase;
//     margin-bottom: 1rem;
//     text-align: center;
//     color: var(--text-secondary);
//     background: var(--bg-secondary);
//     font-size: 1.5rem;
//     letter-spacing: 0.3ch;
//     width: 100%;
//   }
  
//   .logo svg {
//     transform: rotate(0deg);
//     transition: var(--transition-speed);
//   }
//   .Logo{

//     height: 3rem;
//   }
  
//   .logo-text
//   {
//     display: inline;
//     position: absolute;
//     left: -999px;
//     transition: var(--transition-speed);
//   }
  
//   .navbar:hover .logo svg {
//     transform: rotate(-180deg);
//   }
//   /* Small screens */
//   @media only screen and (max-width: 600px) {
//     .navbar {
//       bottom: 0;
//       width: 100vw;
//       height: 5rem;
//     }
  
//     .logo {
//       display: none;
//     }
  
//     .navbar-nav {
//       flex-direction: row;
//     }
  
//     .nav-link {
//       justify-content: center;
//     }
  
//     main {
//       margin: 0;
//     }
//   }
  
//   /* Large screens */
//   @media only screen and (min-width: 600px) {
//     .navbar {
//       top: 0;
//       width: 5rem;
//       height: 100vh;
//     }
  
//     .navbar:hover {
//       width: 16rem;
//     }
  
//     .navbar:hover .link-text {
//       display: inline;
//     }
  
//     .navbar:hover .logo svg
//     {
//       margin-left: 11rem;
//     }
  
//     .navbar:hover .logo-text
//     {
//       left: 0px;
//     }
//   }
  
//   .dark {
//     --text-primary: #b6b6b6;
//     --text-secondary: #ececec;
//     --bg-primary: #23232e;
//     --bg-secondary: #141418;
//   }
  
//   .light {
//     --text-primary: #1f1f1f;
//     --text-secondary: #000000;
//     --bg-primary: #ffffff;
//     --bg-secondary: #e4e4e4;
//   }
  
//   .solar {
//     --text-primary: #576e75;
//     --text-secondary: #35535c;
//     --bg-primary: #fdf6e3;
//     --bg-secondary: #f5e5b8;
//   }
  
//   .theme-icon {
//     display: none;
//   }
  
//   .dark #darkIcon {
//     display: block;
//   }
  
//   .light #lightIcon {
//     display: block;
//   }
  
//   .solar #solarIcon {
//     display: block;
//   }
// .listpic{

//     height: 2rem;
//     margin: 0 1.5rem;
// // } 