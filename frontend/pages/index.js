import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "../styles/Home.module.css";

const socket = io("http://localhost:3006");

const userRoutes = {
  addUser: "/addUser",
  updateUser: "/updateUser",
};

export default function Home() {
  const [user, setUser] = useState({
    username: "",
    bio: "",
  });

  const [userData, setUserData] = useState([]);

  async function getUserData() {
    const data = await fetch("http://localhost:3005/");
    const users = await data.json();
    setUserData(users);
  }

  useEffect(async () => {
    socket.on("pubsub", async (route) => {
      console.log("frontend route", route);
      if (route == userRoutes.addUser) {
        await getUserData();
      }
    });
    await getUserData();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    fetch("http://localhost:3005/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setUser({
      username: "",
      bio: "",
    });
  };

  return (
    <div className={styles.container}>
      <h1>UserName</h1>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
      />
      <hr />
      <h1>Bio</h1>
      <input type="text" name="bio" value={user.bio} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      {userData.map((e, i) => (
        <div key={i}>
          <h2>
            username - {e.username} : bio - {e.bio}
          </h2>
        </div>
      ))}
    </div>
  );
}
