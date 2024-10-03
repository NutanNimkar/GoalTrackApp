import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to access URL parameters
import axios from 'axios';
import styles from './ResetPassword.module.css';
import Logo from '../../Images/Login_Page_Image/Logo_GoalTrack.PNG';
import PasswordIcon from '../../Images/Login_Page_Image/lock-alt-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4060/api/auth/reset-password/${token}`, {
        password: data.password,
      });

      if (response.status === 200) {
        reset(); // Reset form fields
        navigate('/login', { replace: true }); // Redirect to login page on success
      }
    } catch (error) {
      // Handle any errors that occur during the request
      if (error.response && error.response.data && error.response.data.error) {
        setError('password', { type: 'manual', message: error.response.data.error });
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.logoPic}>
        <img src={Logo} className={styles.logoIcon} alt='Logo' />
      </div>
      <div className={styles.header}>
        <div className={styles.text}>RESET PASSWORD</div>
        <div className={styles.underline}></div>
      </div>
      <form className={styles.userInput} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.passwordInput}>
          <img src={PasswordIcon} className={styles.passwordIcon} alt='Password' />
          <input
            type='password'
            placeholder='Enter new password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>
        <div className={styles.passwordInput}>
          <img src={PasswordIcon} className={styles.passwordIcon} alt='Confirm Password' />
          <input
            type='password'
            placeholder='Confirm new password'
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
            })}
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
        </div>
        <button disabled={isSubmitting} className={styles.submit}>
          {isSubmitting ? 'Submitting...' : 'RESET PASSWORD'}
        </button>
        {isSubmitting && !errors.password && <div className={styles.success}>Password successfully updated!</div>}
      </form>
      <div className={styles.links}>
        <div className={styles.linkToLogin}>
          <Link to='/login' className={styles.link}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
