import React, { useState } from "react";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import styled from "styled-components";
import { BASE_URL } from "../lib/config";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: hsl(210, 25%, 8%);
`;

const Box = styled.div`
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #c5c5c5;
  transition: all 300ms;

  h1 {
    color: #c5c5c5;
    margin: 10px 0;
    text-align: center;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    color: #c5c5c5;
    height: 40px;
    margin: 10px 0;
    padding: 0 20px;
    font-size: 20px;
  }

  button {
    background: none;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    height: 40px;
    width: 100%;
    margin: 10px 0;
    color: #c5c5c5;
    cursor: pointer;
    font-size: 20px;
  }
`;

const Details = styled.div`
  width: 400px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c5c5c5;

  button {
    color: #c5c5c5;
    background: none;
    border: none;
    font-size: inherit;
    cursor: pointer;
    outline: none;
  }
`;

const Error = styled.div`
  color: #ffb454;
  font-weight: 700;
  margin: 10px 0;
  text-align: center;
`;

function Login() {
  const [login, setLogin] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await Axios.post(`${BASE_URL}/api/login/`, {
        username,
        password
      });
      window.localStorage.setItem('token', JSON.stringify(result.data.key));
      setLoading(false);
      setLoggedIn(true);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const registrationHandler = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await Axios.post(`${BASE_URL}/api/registration/`, {
        username,
        password1: password,
        password2
      });
      window.localStorage.setItem('token', JSON.stringify(result.data.key));
      setLoading(false);
      setLoggedIn(true);
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
    }
  };

  const clickHandler = login ? loginHandler : registrationHandler;

  if (loggedIn) {
      return <Redirect to="/" />
  }

  return (
    <Container>
      <Box>
        <h1>{login ? "Login" : "Register"}</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {!login && (
          <input
            type="password"
            placeholder="Confirm password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        )}
        {loading ? (
          <button>Loading...</button>
        ) : (
          <button onClick={clickHandler}>{login ? "Login" : "Register"}</button>
        )}
      </Box>
      <Details>
        {login ? (
          <div>
            Don't have an account ?{" "}
            <button onClick={() => setLogin(false)}>Register</button>
          </div>
        ) : (
          <div>
            Already have an account?{" "}
            <button onClick={() => setLogin(true)}>Login</button>
          </div>
        )}
      </Details>

      {!!error && (
        <Error>
          <p>Ah hell, there was an error :(</p>
          {error.password1 && error.password1.map(each => <p>{each}</p>)}
        </Error>
      )}
    </Container>
  );
}

export default Login;
