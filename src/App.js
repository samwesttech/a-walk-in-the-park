import "./App.css";
import { navigate, Router } from "@reach/router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Ads from "./components/Ads";
import PostAd from "./components/PostAd";
import Profile from "./components/Profile";
import UserPage from "./components/UserPage";
import Login from "./components/Login";
import { AuthProvider } from "./Authentication";
import InputUserDetails from "./components/InputUserDetails";
import Messages from "./components/Messages";
import Inbox from "./components/Inbox";
import React, { useState } from "react";
import Users from "./components/Users";
import ProfileMap from './components/ProfileMap';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const setLogin = (bool) => {
    if (!bool) {
      navigate("/");
      window.location.reload();
    }
    setLoggedIn(bool);
  };

  return (
    <AuthProvider>
      <Header setLoggedIn={setLogin} loggedIn={loggedIn} />
      <Router>
        <InputUserDetails path='/signUpDetails' setLogin={setLogin} />
        <LandingPage path='/' />
        <Login path='/login' setLogin={setLogin} />
        <Ads path='/home' />
        <PostAd path='/new-ad' />
        <Profile path='/profile' setLoggedIn={setLogin} loggedIn={loggedIn} />
        <ProfileMap path='/map' />
        <UserPage path='/user/:username' />
        <Messages path='/messages' />
        <Inbox path='/inbox' />
        <Inbox path='/inbox/:username' />
        <Users path='/users' />
      </Router>
      {loggedIn ? <Footer /> : null}
    </AuthProvider>
  );
}

export default App;
