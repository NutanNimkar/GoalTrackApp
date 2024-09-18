import React, { useState } from 'react';
import styles from './UserSignUp.module.css';
import { useSignUp } from '../../hooks/useSignUp';
import EmailIcon from '../../Images/Login_Page_Image/email-1-svgrepo-com.svg';
import NameIcon from '../../Images/Login_Page_Image/user-svgrepo-com.svg';
import LockIcon from "../../Images/Login_Page_Image/lock-alt-svgrepo-com.svg";
import Logo from "../../Images/Login_Page_Image/Logo_GoalTrack.PNG";

const UserSignup = () => {
  const [Name, setName] = useState('');
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup, isLoading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(Name, email, password);
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logo}><img src={Logo} className={styles.logoIcon} alt='logo' /></div>
      <div className={styles.header}>
        <div className={styles.text}> SIGN UP</div>
        <div className={styles.underline}></div>
      </div>

      <form className={styles.userInput} onSubmit={handleSubmit}>
        <div className={styles.usernameInput}>
          <img src={NameIcon} className={styles.nameIcon} alt='Name' />
          <input type='text' onChange={(e) => setName(e.target.value)} value={Name} placeholder='Name' />
        </div>
        <div className={styles.emailInput}>
          <img src={EmailIcon} className={styles.emailIcon} alt='Email' />
          <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' />
        </div>
        <div className={styles.passwordInput}>
          <img src={LockIcon} className={styles.passwordIcon} alt='Password' />
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button disabled={isLoading} className={styles.submit}>CONTINUE</button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
      <div className={styles.existAccount}>Already Have An Account? <span>Click Here</span></div>
    </div>
  );
}

export default UserSignup;
