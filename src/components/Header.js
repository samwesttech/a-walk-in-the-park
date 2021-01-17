import React from "react";
import { Link } from "@reach/router";
import { HeaderStyled } from "../styles";

const Header = (props) => {
  return (
    <>
      <HeaderStyled className='header'>
        {props.loggedIn ? (
          <Link className='header-title' to='/home'>
            A Walk in the Park
          </Link>
        ) : (
          <Link className='header-title' to='/'>
            A Walk in the Park
          </Link>
        )}
      </HeaderStyled>
    </>
  );
};

export default Header;
