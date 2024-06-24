/* import React from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

const Login = () => {
  const handleLogin = async (data) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login; */