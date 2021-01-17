import React, { useCallback, useContext, useState } from 'react';
import { navigate, Link } from "@reach/router";
import app from "../firebase.js";
import { LoginContainer } from '../styles'


const Login = (props) => {
    const [error, setError] = useState()

    const handlePostLogin = () => {
      console.log("in handle post login")
      if (!error) {
        props.setLogin(true)
        navigate("/home")
      }
    }

    const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await app
              .auth()
              .signInWithEmailAndPassword(email.value, password.value).then(()=>{
                handlePostLogin()
              })
          } catch (err) {
            setError(err)
            alert(err);
          }


        }, []
      );
        return (
            <LoginContainer>
                <h1>Sign In</h1>
                <form onSubmit={(e) => handleLogin(e)}>
                    <p>Email: </p>
                    <input type="text" required id="email"/>
                    <p>Password: </p>
                    <input type="password" required id="password"/>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? Sign up <Link to="/signUpDetails">here!</Link></p>
            </LoginContainer>
        );
    // }

  
};

export default Login;