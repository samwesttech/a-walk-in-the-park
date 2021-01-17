import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../Authentication";
import {db, storage} from '../firebase'
import { ProfilePicture, ProfileContainer, ProfileHeaderContainer, MyAdsContainer } from '../styles'
import Map from './Map/Map';
import { formatDOB, calculateAge } from '../utils/calculateAge'
import Loading from './Loading';
import * as geolib from 'geolib';
import ProfileAdCards from './ProfileAdCards';
import { Link } from "@reach/router";
const postcodes = require("node-postcodes.io");


const UserPage = (props) => {
  const user = props.username;
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(currentUser);
  const [userProfile, setUserProfile] = useState()
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState(0);
  const [userDistrict, setUserDistrict] = useState('');
  const [center, setCenter] = useState({latitude:0, longitude:0});
  const [ads, setAds] = useState([])
  const [image, setImage] = useState()


  useEffect(() => {
    async function fetchData() {
      const userRef = db.collection("users");
      const snapshot = await userRef.where("username", "==", user).get();
      if (snapshot.empty) {
        console.log("No matching documents");
        return;
      }
      let userInfo = {};
      snapshot.forEach((doc) => {
        userInfo = doc.data();
      });
      setUserProfile(userInfo);
      const dob = formatDOB(userInfo.dob);
      const age = calculateAge(dob);
      setAge(age);
      await getCenterLatLng(profile.postcode, userInfo.postcode).then((res) => {
        setCenter({latitude: res.latitude, longitude:res.longitude});
      });
      setLoading(false);
    }

    async function fetchAds() {
      const adsRef = db.collection("ads").where("username", "==", user)
      const snapshot = await adsRef.get();
      const fetchedAds = [];
      snapshot.forEach((doc) => {
        const ad = doc.data();
        fetchedAds.push(ad);
      });
      setAds(fetchedAds);
    }

    const username = user
    storage  
      .ref(`${username}.jpg`)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setImage(url)
      });

    fetchData();
    fetchAds()
  }, [user]);

  async function getGeolocation(postcode) {
    const result = await postcodes.lookup(postcode).then((res) => {
      return res.result;
    });
    return result;
  }

  async function getCenterLatLng(profilePostcode, userPostcode) {
    if (profilePostcode && userPostcode) {
      let pp = await getGeolocation(profilePostcode);
      let up = await getGeolocation(userPostcode);
      setUserDistrict(up.admin_district);
      return geolib.getCenter([
        { latitude: pp.latitude, longitude: pp.longitude },
        { latitude: up.latitude, longitude: up.longitude },
      ])
    }
  }

  if (loading && center !== {latitude: 0, longitude: 0}) {
    return <Loading />;
  } else {
    return (
      <ProfileContainer>
        <ProfileHeaderContainer>
            <div class="top">
              <ProfilePicture src={image} width='100px'></ProfilePicture>
              <h2>{userProfile.username}</h2>
            </div>

            <div class="profile">
              <p>{userProfile.name}</p>
              <p>{age}</p>
              <p>📍 {userDistrict}</p>
              <p>{userProfile.gender[0].toUpperCase() + userProfile.gender.slice(1)}</p>
              
            </div>

            <div class='info'>
            <p>{userProfile.bio}</p>
          </div>
          <div className='line'>
          <Link to={`/inbox/${userProfile.username}`}>
            {" "}
            <button className='message'>Message</button>
          </Link>
          </div>
          


        </ProfileHeaderContainer>

        <p id="title">Parks Between You</p>
        <Map centerLatitude={center.latitude} centerLongitude={center.longitude}/>
      

        <MyAdsContainer>
          
        <p id="title">{user}'s Ads</p>
          <ul>
            {ads.map(ad => {
              return (
                <ProfileAdCards ad={ad}/>
              )
            })}
          </ul>
        </MyAdsContainer>

       
      </ProfileContainer>
    );
  }
};

export default UserPage;
