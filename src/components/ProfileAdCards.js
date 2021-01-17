import React from 'react';
import { db } from "../firebase";

import {ProfileAdCardsContainer} from '../styles'

const ProfileAdCards = (props) => {
    const {ad} = props 

    const deleteAd = () => {
        db.collection("ads")
          .where("title", "==", ad.title)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              console.log(doc.id, "=>", doc.data());
              db.collection("ads").doc(doc.id).delete();
            });
          })
          .catch((err) => {
            console.log("Error getting documents", err);
          });
        props.handleDelete(ad.title);
      };

    return (
        <ProfileAdCardsContainer>
            
            <div className='delete-button' onClick={() => deleteAd()}>
              ❌
            </div>
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
        </ProfileAdCardsContainer>
    );
};

export default ProfileAdCards;