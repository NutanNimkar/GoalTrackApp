import React, { useState } from 'react';
import styles from './UserLogin.module.css';
import { useLogin } from '../../hooks/useLogin';
import EmailIcon from '../../Images/Login_Page_Image/email-1-svgrepo-com.svg';
import LockIcon from "../../Images/Login_Page_Image/lock-alt-svgrepo-com.svg";
import Logo from "../../Images/Login_Page_Image/Logo_GoalTrack.PNG";
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logoPic}>
                <img src={Logo} className={styles.logoIcon} alt='Logo' />
            </div>
            <div className={styles.header}>
                <div className={styles.text}>LOGIN</div>
                <div className={styles.underline}></div>
            </div>
            <form className={styles.userInput} onSubmit={handleSubmit}>
                <div className={styles.emailInput}>
                    <img src={EmailIcon} className={styles.emailIcon} alt='Email' />
                    <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className={styles.passwordInput}>
                    <img src={LockIcon} className={styles.passwordIcon} alt='Password' />
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button disabled={isLoading} className={styles.submit}>CONTINUE</button>
                {error && <div className={styles.error}>{error}</div>}
            </form>
            <div className={styles.forgotPass}>
                Forgot Password? <Link to='/forgot-password' className={styles.link}><span>Click Here</span></Link>
            </div>
            <div className={styles.createAccount}>
                Create New Account? <Link to='/signup' className={styles.link}> <span>Click Here</span> </Link>
            </div>
        </div>
    )
}

export default UserLogin;
