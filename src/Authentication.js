import React, { useEffect, useState } from "react";
import app from "./firebase.js";
import { db } from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [pending, setPending] = useState(true);

   useEffect(() => {
      app.auth().onAuthStateChanged((user) => {
        // console.log(user, "user in auth")

        async function fetchData() {
          const userRef = db.collection("users");
          const snapshot = await userRef.where("email", "==", user.email).get();
          if (snapshot.empty) {
            console.log("No matching documents");
            return;
          } 
            let userInfo = {};
  
            snapshot.forEach((doc) => {
              userInfo = doc.data();
            });
            // console.log(userInfo)
            setCurrentUser(userInfo);
          
        }
      if (user) fetchData();
      setPending(false)
     });
   }, []);
   
   if(pending){
     return <>Please wait...</>
   }
   return (
     <AuthContext.Provider
       value={{
         currentUser,
         setCurrentUser: () => {}
       }}
     >
       {children}
     </AuthContext.Provider>
   );
 };