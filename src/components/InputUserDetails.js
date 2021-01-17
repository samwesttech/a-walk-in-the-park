import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../Authentication'
import { navigate, Link } from "@reach/router";
import {db, auth} from "../firebase";
import app from "../firebase.js";
import {LoginContainer} from '../styles'
import SignUpDetails from './SignUpDetails'
import {formatDOB, calculateAge, formatDOBFromSignUp} from '../utils/calculateAge'


const InputUserDetails = (props) => {
    const context  = useContext(AuthContext)
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const [gender, setGender] = useState()
    const [postcode, setPostcode] = useState()
    const [bio, setBio] = useState()
    const [dob, setDob] = useState()
    const [error, setError] = useState()
    const [nextPage, setNextPage] = useState(false)
    const [password, setPassword] = useState("")
    const [dobClass, setDobClass] = useState("show")
    const [age, setAge] = useState()
    const [validPostcode, setValidPostcode] = useState("hide")


    const handleSubmit = (e) => {
        e.preventDefault()

        if (age >= 18 && validPostcode === "hide") {
            db.collection("users").doc(username).set({
                email: email,
                name: name,
                username: username,
                gender: gender,
                postcode: postcode,
                bio: bio,
                dob: formatDOBFromSignUp(dob),
                id: username
            }).then(() => {
                async function signIn() {
                    try {
                        await app
                            .auth()
                            .createUserWithEmailAndPassword(email, password).then(()=>{
                                navigate("/home")
                            })
                    } catch (err) {
                        setError(err)
                        alert(err)
                    }
                }
              signIn()
              props.setLogin(true)
            })
        } else {
            alert("Please make sure you have filled in the form correctly")
        }
    }

    const handleDobChange = (dob) => {
        const firstFormat = formatDOBFromSignUp(dob)
        const secondFormat = formatDOB(firstFormat)
        const age = calculateAge(secondFormat)
        

        if (age >= 18) {
            setDobClass("hide")
        }

        setAge(age)
    }

    const validatePostcode = (postcode) => {
        const valid = postcode.match(/^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/g)
        if (valid) {
            setValidPostcode("hide")
        } else {
            setValidPostcode("show")
        }
    }

    

    if (!nextPage) {
        return (
            <>
            <SignUpDetails username={username} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword}  setNextPage={setNextPage}/>
            <p>Already have an account? Login <Link to="/login">here!</Link></p>
            </>
        )
    } else {
        return (
            <LoginContainer>
            <h1>Sign Up</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <p>Full name: </p>
                <input type="text" required onChange={(e) => setName(e.target.value)}/>
                <p>Gender:</p>
                <input type="text" required onChange={(e) => setGender(e.target.value)}/>
                <p>Postcode:</p>
                <input type="text" required onChange={(e) => setPostcode(e.target.value)} onBlur={(e) => validatePostcode(e.target.value)}/>
                <p class={validPostcode}>Please enter a valid postcode</p>
                <p>Bio:</p>
                <input type="text" required onChange={(e) => setBio(e.target.value)}/>
                <p>Dob:</p>
                <input type="date" required onChange={(e) => setDob(e.target.value)} onBlur={(e) => handleDobChange(e.target.value)}/>
                <p class={dobClass}>⚠️ You must be over 18 to sign up</p>
                <button onClick={() => setNextPage(false)}>Go Back</button>
                <button type="submit">Sign in</button>
            </form>
            <p>Already have an account? Login <Link to="/login">here!</Link></p>
        </LoginContainer>
        )
    }
};

export default InputUserDetails;