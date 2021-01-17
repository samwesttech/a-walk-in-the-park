import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const usersRef = db.collection("users");
      const snapshot = await usersRef.get();
      const fetchedUsers = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        fetchedUsers.push(user);
      });
      let mappedUsers = fetchedUsers.map((user) => {
        return {
          id: user.username,
          name: user.name,
          role: "member",
          photoUrl: "https://static.thenounproject.com/png/363640-200.png"
        };
      });
      setUsers(mappedUsers);
    }
    fetchData();
  }, []);
  return <h1>hi</h1>;
};

export default Users;
