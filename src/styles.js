import styled from "styled-components";

export const HeaderStyled = styled.div`
  font-family: "Lato", sans-serif;
  text-decoration: none;
  width: 100%;
  height: 4.5rem;
  margin: auto;
  padding-top: 0.8rem;
  text-align: center;
  text-decoration: none;
  font-size: 2.8rem;
  background-color: #2bae66ff;

  .header-title {
    text-decoration: none;
    color: #fcf6f5ff;
  }
`;

export const FooterStyled = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 12%;
  background-color: #2bae66ff;
  padding: auto;
  margin: auto;

  // FOOTER BUTTONS
  .buttons-container {
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    padding-right: 10px;
  }

  .home-button,
  .add-button,
  .user-button,
  .message-button,
  .map-button {
    margin-top: 1rem;
  }

  .home-button {
    height: 2.8rem;
    width: 3rem;
  }

  .add-button {
    height: 2.5rem;
  }

  .user-button {
    height: 3.1rem;
    width: 3.2rem;
    margin-top: 0.6rem;
  }

  .message-button {
    height: 3.5rem;
    width: 2.7rem;
    margin-top: 0.5rem;
  }

  .map-button {
    height: 2.8rem;
    width: 3rem;
    margin-top: 0.8rem;
  }

  @media (min-width: 500px) {
    .home-button,
    .add-button,
    .user-button,
    .message-button,
    .map-button {
      margin-top: 1.5rem;
    }

    .home-button {
      height: 2.8rem;
      width: 3rem;
    }

    .add-button {
      height: 2.5rem;
    }

    .user-button {
      height: 3.1rem;
      width: 3.2rem;
    }

    .message-button {
      height: 3.5rem;
      width: 2.7rem;
    }

    .map-button {
      height: 2.8rem;
      width: 3rem;
    }
  }
`;

// ad - adder

export const AdForm = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;

  .submit-button {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    border-radius: 0.4rem;
    width: 20rem;
    height: 2.5rem;
    margin: 0.5em;
    text-align: center;
  }

  h2 {
    font-family: "Open Sans", sans-serif;
    color: #2bae66ff;
    font-weight: bold;
    font-size: 1.3rem;
    margin: 0.8rem;
  }

  input {
    width: 20rem;
    height: 2rem;
    font-family: "Open Sans", sans-serif;
    border-radius: 0.4rem;
    border-width: 0.2rem;
    border-color: #2bae66ff;
    text-transform: uppercase;
  }

  textarea {
    width: 20rem;
    height: 7rem;
    font-family: "Open Sans", sans-serif;
    border-radius: 0.4rem;
    border-width: 0.2rem;
    border-color: #2bae66ff;
  }

  .question {
    color: #2bae66ff;
  }

  .check-box {
    width: 2rem;
    padding: 0;
    margin: 0;
  }

  .check-box:checked {
    width: 5rem;
    padding: 0;
    margin: 0;
    border-color: #2bae66ff;
  }
`;

export const LandingPageStyled = styled.div`
  text-align: center;

  image {
    align-items: center;
  }

  p {
    font-family: "Open Sans", sans-serif;
    color: #2bae66ff;
  }

  button {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Catamaran", sans-serif;
    font-weight: bold;
    border-radius: 0.4rem;
    width: 8rem;
    height: auto;
    padding: 0.2rem 0.5rem;
    margin: 0.5em;
    text-align: center;
  }
`;

export const AdList = styled.ul`
  padding: 0px 0px 2rem 0px;
  margin: auto;
  display: inline-block;

  h1 {
    font-family: "Open Sans", sans-serif;
    font-size: 1.7rem;
  }

  form {
    padding-bottom: 1rem;
  }

  .submit-button {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Catamaran", sans-serif;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    width: 8rem;
    height: 1.8rem;
    margin: 0.5em;
    text-align: center;
    margin-top: 1rem;
  }

  .select-box {
    background-color: white;
    font-family: "Catamaran", sans-serif;
    border-color: #2bae66ff;
    padding: 0px;
    margin-bottom: 0px;
  }

  .question {
    margin-bottom: 0.5rem;
  }
`;

export const AdCardStyled = styled.li`
  border-top: solid 1px lightgrey;
  border-bottom: solid 1px lightgrey;
  list-style-type: none;
  padding: 10px 10px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;

  .username {
    text-decoration: none;
    color: #2bae66ff;
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
  }

  .delete-button {
    float: right;
  }

  //Advert pic and username
  .ad_user {
    display: inline-block;
    text-align: center;
    margin: auto 0px;
    width: 25%;

    img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      margin: auto;
      border: solid 1px lightgrey;
    }

    p {
      margin: auto;
    }
  }

  button {
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    padding-right: 0rem;
    margin-right: 0rem;
  }

  .emoji {
    font-size: 1.5rem;
    padding-right: 0rem;
    margin-right: 0rem;
  }

  .distance {
    font-size: 0.73rem;
    font-weight: bold;
    color: #2bae66ff;
  }

  //Advert title and description
  .ad_info {
    width: 70%;
    margin: auto;
    padding: auto;
    display: inline-block;
    padding-left: 1.5rem;
    font-size: 0.8rem;
  }

  .ad_info h2,
  span {
    margin: auto;
    padding: auto;
  }

  .ad_info h2 {
    font-family: "Catamaran", sans-serif;
    line-height: 1.5rem;
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  h3 {
    margin: 0 0 12px 0;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    color: #2bae66ff;
    font-size: 0.73rem;
  }

  .ad_info span {
    font-family: Helvetica, sans-serif;
    line-height: 1.2rem;
    font-size: 1rem;
  }

  .ad_info br {
    margin: 10px;
  }
  .ad_info button {
    padding: 0.1rem;
    margin: 0.5rem 1.7rem 0rem 0rem;
  }

  @media (min-width: 500px) {
    width: 500px;
    margin: 0px auto;
    padding: auto;
  }
`;

// PROFILE PAGE STYLING

export const ProfileContainer = styled.div`
  text-align: center;
  font-size: 25px;
  padding-top: 0rem;
  height: auto;

  #title {
    width: 80%;
    color: #2bae66ff;
    margin: 30px auto;
    text-align: left;
  }

  .logout-button {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Catamaran", sans-serif;
    font-size: 0.8rem;
    border-radius: 0.4rem;
    width: 8rem;
    height: 1.8rem;
    margin: 0.5em;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 0rem;
    padding-bottom: 0rem;
    align-items: center;
  }

  h2 {
    font-size: 1.2rem;
    color: #2bae66ff;
    margin-bottom: 0.5rem;
    margin-left: 30px;
  }

  h3 {
    color: #2bae66ff;
    margin-bottom: 0.8rem;
  }

  .info {
    font-size: 1.2rem;
    font-family: Helvetica, sans-serif;
    text-align: left;
    border-bottom: 1px solid grey;
    width: 90%;
    margin: 0 auto;
  }

  .submit-button {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Catamaran", sans-serif;
    font-weight: bold;
    border-radius: 0.4rem;
    width: 10rem;
    height: 2rem;
    margin: 0.5em;
    text-align: center;
  }

  .postcode {
    padding: 0;
    margin: 0;
  }

  .postcode-title {
    padding: 0;
    margin: 0;
  }
`;
export const ProfilePicture = styled.img`
  border-radius: 50%;
  float: left;
  margin-left: 20px;
  margin-top: 5px;
`;

export const ProfileHeaderContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: auto;

  header {
    /* position: relative; */
    height: 80px;
    background-color: #eeeeee;
    display: flex;
  }
  #signout {
    border: none;
    background-color: none;
    font-size: 25px;
    color: black;
  }
  p {
    padding-left: 5px;
    padding-right: 5px;
  }
  .show {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #eeeeee;
    font-size: 20px;
    color: black;
    justify-content: space-evenly;
  }

  .message {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    border-radius: 0.4rem;
    width: 300px;
    height: 2.5rem;
    margin: auto;
    text-align: center;
  }

  .line {
    border-bottom: 1px solid grey;
    width: 80%;
    margin: 0 auto;
    padding: 20px;
  }

  .hide {
    visibility: hidden;
    font-size: 0px;
  }
  .profile {
    display: flex;
    font-size: 16px;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;
  }

  .top {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
`;
export const MyAdsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 8rem;
`;

export const EditProfileContainer = styled.div`
  text-align: center;
  font-size: 25px;
  padding-top: 0rem;
  height: auto;
  display: flex;
  flex-direction: column;

  form {
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }

  .top {
    width: 100%;
    display: flex;
    align-items: center;
    height: 150px;
  }
  .submit-button {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Catamaran", sans-serif;
    font-weight: bold;
    border-radius: 0.4rem;
    width: 100%;
    height: 2rem;
    margin-top: 20px;
    text-align: center;
  }

  h2 {
    font-size: 35px;
    color: #2bae66ff;
    margin-bottom: 0.5rem;
    margin-left: 30px;
  }

  h3 {
    color: #2bae66ff;
    margin-bottom: 0.8rem;
  }

  textarea {
    height: 6rem;
    font-family: "Open Sans", sans-serif;
    border: none;
    border-bottom: 1px solid #2bae66ff;
    width: 100%;
  }

  input {
    font-family: "Open Sans", sans-serif;
    border: none;
    border-bottom: 1px solid #2bae66ff;
    width: 100%;
  }
`;
// LOGIN STYLES

export const LoginContainer = styled.div`
  height: auto;
  text-align: left;
  padding-left: 50px;

  h1 {
    color: #2bae66ff;
  }

  input {
    width: 80%;
    height: 30px;
    border: none;
    background-color: white;
    border-bottom: 2px solid #2bae66ff;
  }

  button {
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    background: #2bae66ff;
    font-family: "Catamaran", sans-serif;
    font-weight: bold;
    border-radius: 0.4rem;
    width: 80%;
    margin-top: 30px;
    text-align: center;
  }

  .show {
    font-size: 12px;
  }

  .hide {
    visibility: hidden;
    font-size: 0px;
  }
`;

export const ProfileAdCardsContainer = styled.div`
  text-align: left;
  border-bottom: 1px solid grey;
  width: 90%;

  h3 {
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }
`;
