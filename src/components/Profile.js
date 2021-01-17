import React, { useEffect, useState, useCallback } from "react";
import profilepic from "../images/download.jpeg";
import editLogo from "../images/edit.png";
import Loading from "./Loading";
import EditProfile from "./EditProfile";
import {
  ProfilePicture,
  ProfileContainer,
  ProfileHeaderContainer,
  MyAdsContainer
} from "../styles";
import { formatDOB, calculateAge } from "../utils/calculateAge";
import { useContext } from "react";
import { AuthContext } from "../Authentication";
import ProfileAdCards from "./ProfileAdCards";

import { db, storage } from "../firebase";

import app from "../firebase";
const postcodes = require("node-postcodes.io");

const Profile = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(currentUser);
  const [bio, setBio] = useState(currentUser.bio);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [profileDistrict, setProfileDistrict] = useState("");
  const [age, setAge] = useState(0);
  const [ads, setAds] = useState([]);
  const [err, setErr] = useState();
  const [image, setImage] = useState();
  const [showOptions, setShowOptions] = useState("hide");

  useEffect(() => {
    const dob = formatDOB(currentUser.dob);
    const age = calculateAge(dob);

    async function fetchData() {
      // console.log(currentUser.username)
      const adsRef = db
        .collection("ads")
        .where("username", "==", currentUser.username);
      const snapshot = await adsRef.get();
      const fetchedAds = [];
      snapshot.forEach((doc) => {
        const ad = doc.data();
        fetchedAds.push(ad);
      });
      setAds(fetchedAds);
      await getLatLng(profile.postcode).then((res) => {
        console.log(res);
        setProfileDistrict(res.admin_district);
      });
    }
    fetchData();

    const username = profile.username;
    storage
      .ref(`${username}.jpg`)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setImage(url);
      });

    setAge(age);
  }, []);

  const updateBio = (newBio) => {
    setBio(newBio);
  };

  const handleEdit = (bool) => {
    setEdit(bool);
  };

  const handlePostLogout = () => {
    console.log("in handle post login");
    if (!err) {
      props.setLoggedIn(false);
    }
  };

  const handleLogout = useCallback(async (e) => {
    try {
      await app
        .auth()
        .signOut()
        .then(() => {
          handlePostLogout();
        });
    } catch (error) {
      setErr(err);
      alert(err);
    }
  });

  const handleOptionClick = (e) => {
    if (showOptions === "show") setShowOptions("hide");
    if (showOptions === "hide") setShowOptions("show");
  };

  async function getGeolocation(postcode) {
    const result = await postcodes.lookup(postcode).then((res) => {
      return res.result;
    });
    return result;
  }

  async function getLatLng(profilePostcode) {
    if (profilePostcode) {
      let pp = await getGeolocation(profilePostcode);
      return pp;
    }
  }

  const handleDelete = (adToDelete) => {
    const filteredAds = ads.filter((ad) => {
      return ad.title !== adToDelete;
    });

    setAds(filteredAds);
  };

  if (loading) {
    return <Loading />;
  } else if (edit) {
    return (
      <EditProfile
        handleEdit={handleEdit}
        userInfo={profile}
        bio={bio}
        profilePicture={image}
        updateBio={updateBio}
      />
    );
  } else {
    return (
      <div>
        <ProfileContainer>
          <ProfileHeaderContainer>
            <header>
              <button id='signout' onClick={(e) => handleOptionClick(e)}>
                ☰
              </button>
              <div class={showOptions}>
                <p onClick={handleLogout}>Logout</p>
                <p onClick={(e) => handleEdit(e)} id='show'>
                  Edit Profile
                </p>
              </div>
            </header>

            <div class='top'>
              <ProfilePicture
                src={image}
                id='img'
                width='100px'
                height='100px'
              ></ProfilePicture>
              <h2>{profile.username}</h2>
            </div>

            <div class='profile'>
              <p>{profile.name}</p>
              <p>{age}</p>
              <p>{profileDistrict}</p>
              <p>{profile.gender[0].toUpperCase() + profile.gender.slice(1)}</p>
            </div>

            <div class='info'>
              <p>{bio}</p>
            </div>
          </ProfileHeaderContainer>

          <MyAdsContainer>
            <ul>
              {ads.map((ad) => {
                return <ProfileAdCards ad={ad} handleDelete={handleDelete} />;
              })}
            </ul>
          </MyAdsContainer>
        </ProfileContainer>
      </div>
    );
  }
};

export default Profile;
