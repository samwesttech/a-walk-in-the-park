import React, { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import { AdForm } from "../styles";
import { navigate } from "@reach/router";
import { useContext } from "react";
import { AuthContext } from "../Authentication";

const PostAd = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [hasChild, setHasChild] = useState(false);
  const [hasDog, setHasDog] = useState(false);
  const user = currentUser.username;
  const postcode = currentUser.postcode;
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("ads").add({
      title: title,
      description: body,
      username: user,
      created_at: timestamp,
      postcode: postcode,
      hasChild: hasChild,
      hasDog: hasDog
    });
    setTitle("");
    setBody("");
    const navToHome = () => {
      setTimeout(() => {
        navigate(`/home`);
      }, 2000);
    };
    navToHome();
    // <Timer
    //   count={0}
    //   onIncrease={(count) => {
    //     if (count === 2) {
    //       navigate(`/home`);
    //     }
    //   }}
    // />;
  };

  return (
    <AdForm>
      <form className='ad-form' onSubmit={(e) => handleSubmit(e)}>
        <h2>Ad Title</h2>
        <input
          type='text'
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Ad</h2>
        <textarea
          type='text'
          required
          onChange={(e) => setBody(e.target.value)}
        />
        <br></br>
        <label className='question' for='with-child'>
          Do you have a child?
        </label>
        <br></br>
        <input
          type='checkbox'
          name='with-child'
          className='check-box'
          onClick={(e) => setHasChild(!hasChild)}
        />
        <br></br>
        <label className='question' for='with-child'>
          Do you have a dog?
        </label>
        <br></br>
        <input
          type='checkbox'
          name='with-dog'
          className='check-box'
          onClick={(e) => setHasDog(!hasDog)}
        />
        <br></br>
        <input type='submit' className='submit-button' />
      </form>
    </AdForm>
  );
};

export default PostAd;
