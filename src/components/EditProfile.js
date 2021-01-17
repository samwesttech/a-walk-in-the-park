import React, { useState } from "react";
import { EditProfileContainer, ProfilePicture } from "../styles";
import { db } from "../firebase";

const EditProfile = (props) => {
  const [username, setUsername] = useState(props.username);
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(props.bio);
  const [postcode, setPostcode] = useState(props.userInfo.postcode);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("users").doc(props.userInfo.username).update({
      bio: bio,
      postcode: postcode
    });

    props.updateBio(bio);
    props.handleEdit(false);
  };
  return (
    <EditProfileContainer>
      <div class="top">
      
        <ProfilePicture
            src={props.profilePicture}
            width='100px'
            height='100px'
          ></ProfilePicture>
            <h2>Edit Profile</h2>
      </div>
    
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Update Bio: </h3>{" "}
        <textarea
          type='text'
          value={bio}
          placeholder={props.bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br />
        <h3 className='postcode-title'>Update Postcode:</h3>
        <input
          type='text'
          placeholder={props.userInfo.postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className='postcode'
        />
        <br></br>
        <input type='submit' class='submit-button' />
      </form>
    </EditProfileContainer>
  );
};

export default EditProfile;
