import { db } from "../firebase";

export async function fetchUsers() {
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
      photoUrl:
        "https://images.wagwalkingweb.com/media/daily_wag/name_guides/cartoon-dog-names/featured_dog/snoopy.jpg?auto=compress&fit=max"
    };
  });
  return mappedUsers;
}

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const usersRef = db.collection("users");
//       const snapshot = await usersRef.get();
//       const fetchedUsers = [];
//       snapshot.forEach((doc) => {
//         const user = doc.data();
//         fetchedUsers.push(user);
//       });
//       setUsers(fetchedUsers);
//       console.log(users);
//     }
//   });
// };

// export default Users;
