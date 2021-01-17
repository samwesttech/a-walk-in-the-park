import React, {useEffect, useState} from 'react';
import { LoginContainer } from '../styles';
import { db, storage } from "../firebase";

const SignUpDetails = (props) => {
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [passwordErrorClass, setPasswordError] = useState("hide")
    const [emailClass, setEmailClass] = useState("hide")
    const [takenUsernames, setTakenUsernames] = useState([])
    const [usernameClass, setUsernameClass] = useState("hide")
    const [passwordClass, setPasswordClass] = useState("hide")
    const [imageAsFile, setImageAsFile] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const usersRef = db.collection("users");
            const snapshot = await usersRef.get();
            const fetchedUsers = [];
            snapshot.forEach((doc) => {
              const users = doc.data();
              fetchedUsers.push(users.username);
            });
            setTakenUsernames(fetchedUsers);
          }
          fetchData();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(password)
        console.log(passwordConfirm)

        if (password === passwordConfirm && emailClass !== "show" && usernameClass !== "show" && passwordClass !== "show") {
            props.setPassword(password)

            // console.log(imageAsFile, "<<<<< ")
            // const uploadTask = storage.ref(`${props.username}.jpg`).put(imageAsFile, {type: 'image/jpeg'})
            props.setNextPage(true)
        } else {
            alert("Please check you have filled the form correctly")
        }
    }

    const handlePasswordMismatch = (e) => {
        
        if (passwordConfirm !== password){
            setPasswordError("show")
        } else {
            setPasswordError("hide")
        }
    }

    const validateEmail = (email) => {
        const valid = email.match(/\S+@\S+\.\S+/g)
        if (valid) {
            setEmailClass("hide")
        }   else {
            setEmailClass("show")
        }
    }

    const validateUsername = (username) =>{
        if (takenUsernames.includes(username)) {
            setUsernameClass("show")
        } else {
            setUsernameClass("hide")
        }
    }

    const validatePassword = (password) => {
        const valid = password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
        if (valid) {
            setPasswordClass("hide")
        }   else {
            setPasswordClass("show")
        }
    }

    // const handleImageAsFile = (e) => {
    //     if (e.target.files[0]) {
    //         const image = e.target.files[0]
    //         setImageAsFile(image)
    //     }
    // }
    return (
        <LoginContainer>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Sign Up</h1>
                <p>Username:</p>
                <input type="text" required onChange={(e) => props.setUsername(e.target.value)} onBlur={(e) => validateUsername(e.target.value)}/>
                <p class={usernameClass}>Username already taken</p>
                <p>Email: </p>
                <input type="text" required id="email" onChange={(e) => props.setEmail(e.target.value)} onBlur={(e) => validateEmail(e.target.value)}/>
                <p class={emailClass}>Please enter a valid email</p>
                <p>Password: </p>
                <input type="password" required id="password" onChange={(e) => setPassword(e.target.value)} onBlur={(e) => validatePassword(e.target.value)}/>
                <p class={passwordClass}>Password must be at least 6 characters and have at least one number and one special character</p>
                <p>Confirm Password: </p>
                <input type="password" required id="password-confirm" onChange={(e) => setPasswordConfirm(e.target.value)} onBlur={() => handlePasswordMismatch()}/>
                <p class={passwordErrorClass}>Passwords do not match</p>
                <input type="file" accept="image/jpeg"/>
                <button type="submit">Next Page</button>
            </form>
        </LoginContainer>
    );
};

// onClick={() => props.setNextPage(true)

export default SignUpDetails;