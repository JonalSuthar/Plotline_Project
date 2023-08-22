import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "../styles/Button";
// import { BrowserRouter as  Redirect } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

const API_URL = "http://localhost:4000/auth/register";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [redirectToHome, setRedirectToHome] = useState(false);

  const handleSignIn = async () => {
    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(API_URL, userData);

      if (response.status === 200) {
        console.log("User registered successfully");
        const userEmail = response.data.getemail;
        localStorage.setItem("userEmail", JSON.stringify(userEmail));
        console.log(userEmail);
        window.location.href = "/";
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      setErrorMessage("User already exit / type valid email address");
      console.error("An error occurred", error);
    }
  };

  return (
    <Wrapper>
      <div className="sign-in-container">
        <h1>Sign In</h1>
        <div className="input-container">
          <input
            type="name"
            placeholder="Username"
            // value={name}
            // onChange={(e) => setEmail(e.target.value)}
          />
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
          <Button onClick={handleSignIn}>Sign In</Button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <p>
            Already have an account ?<a href="/login"> click here</a>
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  /* body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
} */

  .sign-in-container {
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
  a {
    color: rgb(92, 21, 157);
  }
  Button {
    width: 40%;
  }
`;

export default SignIn;
