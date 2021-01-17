import React from "react";
import logo from "../images/logo.png";
import { LandingPageStyled } from "../styles";
import { Link } from "@reach/router";
import Loading from './Loading';

const LandingPage = () => {
  return (
    <LandingPageStyled className='landing'>
      <div>
      <Loading />
      </div>
      <p>
        A Walk in the Park is social app where you can find and connect with
        people wanting to go on a walk!
      </p>
      <Link to='/login'>
        {" "}
        <button className='login-button'>Login</button>
      </Link>
      <Link to='/signUpDetails'>
        {" "}
        <button className='register-button'>I'm new here</button>
      </Link>
    </LandingPageStyled>
  );
};

export default LandingPage;
