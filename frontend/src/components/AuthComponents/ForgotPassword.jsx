import React from 'react';
import { useForm } from 'react-hook-form'; // Import useForm from react-hook-form
import axios from 'axios'; // Import Axios for HTTP requests
import styles from './ForgotPassword.module.css';
import Logo from '../../Images/Login_Page_Image/Logo_GoalTrack.PNG';
import EmailIcon from '../../Images/Login_Page_Image/email-1-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setError, // Import setError for handling server-side validation errors
    reset,    // Import reset to reset form fields
  } = useForm();

  // Define the onSubmit handler
  const onSubmit = async (data) => {
    try {
      // Send the POST request to your server's forgot-password endpoint
      const response = await axios.post('http://localhost:4060/api/auth/forgot-password', data);

      if (response.status === 200) {
        // Reset the form if the request is successful
        reset();
      }
    } catch (error) {
      // Handle any errors that occur during the request
      if (error.response && error.response.data && error.response.data.error) {
        // Use setError to show server-side validation errors
        setError('email', { type: 'manual', message: error.response.data.error });
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.logoPic}>
        <img src={Logo} className={styles.logoIcon} alt='Logo' />
      </div>
      <div className={styles.header}>
        <div className={styles.text}>FORGOT PASSWORD</div>
        <div className={styles.underline}></div>
      </div>
      <form className={styles.userInput} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.emailInput}>
          <img src={EmailIcon} className={styles.emailIcon} alt='Email' />
          <input
            type='email'
            placeholder='Enter your email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>
        <button disabled={isSubmitting} className={styles.submit}>
          {isSubmitting ? 'Submitting...' : 'RESET PASSWORD'}
        </button>
        {isSubmitted && !errors.email && <div className={styles.success}>Reset link sent to your email!</div>}
      </form>
      <div className={styles.links}>
        <div className={styles.linkToLogin}>
          <Link to='/login' className={styles.link}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;