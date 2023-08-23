import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const API_URL = 'https://plotline-project.onrender.com/auth';

function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // const redirectToHome = () => {
  //   window.location.href = '/login';
  // };


  const handleLogin = async () => {
    // const userData = {
    //   email,
    //   password,
    // };

    try {
      const response = await axios.post(`${API_URL}/login`, {email,password});

      if (response.status === 200) {
        console.log('User logged in successfully');
        const token = response.data.accessToken;
        // localStorage.setItem('token', token);
        // e.preventDefault();
        // loginCall({ email: email.current.value }, dispatch);
        // const decodedToken = jwt_decode(token);

        console.log('Response data:', response.data)
        const userEmail = response.data.getemail
        localStorage.setItem('userEmail', JSON.stringify(userEmail));
        console.log(userEmail);
        navigate('/');
        setErrorMessage('');
        // window.location.href = '/';
        // window.location.href = `/home?userEmail=${userEmail}`;
      } else {
        
        console.error('Failed to log in');
        // Handle the error case, show an error message, etc.
      }
    } catch (error) {
      setErrorMessage('Invalid username or password');
      console.error('An error occurred', error);
      // Handle the error case
    }
  };  

  return (
    <Wrapper>
    <div className="login-container">
      <h1>Login</h1>
      <div className="input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
        {errorMessage && <p style={{ color: 'red' }}>({errorMessage})</p>}
        <p>New User? <a href='/signin'>SignIn</a></p>
      </div>
    </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`

.login-container {
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
  align-items: center;
}

input {
  padding: 10px;
  height: 50px;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
}

Button{
    width: 40%;
}

`

export default Login;
