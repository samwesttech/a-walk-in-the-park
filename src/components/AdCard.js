import React, { useEffect, useState, useContext } from "react";
import { AdCardStyled } from "../styles";
import { db, storage } from "../firebase";
import { Link } from "@reach/router";
import { calculateDistance } from "../utils/calculateDistance";
import Loading from "./Loading";
import avatar from "../images/avatar.png";
import { AuthContext } from "../Authentication";
const moment = require("moment");
const postcodes = require("node-postcodes.io");

const AdCard = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [profile] = useState(currentUser);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const [image, setImage] = useState();
  const { ad } = props;

  useEffect(() => {
    getDistance(profile.postcode, ad.postcode).then((distance) => {
      setDistance(distance);
      setLoading(false);
    });

    const username = ad.username;

    storage
      .ref(`${username}.jpg`)
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      })
      .catch((err) => {
        setImage(null);
      });
  });

  async function getGeolocation(postcode) {
    const result = await postcodes.lookup(postcode).then((res) => {
      return res.result;
    });
    return result;
  }

  async function getDistance(profilePostcode, userPostcode) {
    if (profilePostcode && userPostcode) {
      let pp = await getGeolocation(profilePostcode);
      let up = await getGeolocation(userPostcode);

      return calculateDistance(
        pp.latitude,
        pp.longitude,
        up.latitude,
        up.longitude
      );
    }
  }

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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <AdCardStyled>
        <div className='ad_user'>
          <Link className='username' to={`/user/${ad.username}`}>
            {image ? (
              <img src={image} alt='profile pic' />
            ) : (
              <img src={avatar} alt='user profile pic' />
            )}
            <p>{ad.username}</p>{" "}
          </Link>
        </div>
        <div className='ad_info'>
          {ad.username === profile.username ? (
            <div className='delete-button' onClick={() => deleteAd()}>
              ❌
            </div>
          ) : null}
          <h2>{ad.title}</h2>
          <h3>
            {moment.unix(ad.created_at.seconds).startOf("hour").fromNow()}
          </h3>
          <span>{ad.description}</span>
          <br></br>
          <Link to={`/inbox/${ad.username}`}>
            {" "}
            <button className='emoji'>✉️</button>
          </Link>
          {ad.username !== profile.username ? (
            distance > 1 ? (
              <button className='distance'>{distance} miles away</button>
            ) : (
              <button className='distance'>Under a mile away</button>
            )
          ) : null}
        </div>
      </AdCardStyled>
    );
  }
};

export default AdCard;
