import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./lobbyPage.css";
import UserInfo from "./UserInfo";
import LeaderBoard from "./LeaderBoard";
import firebase from "../../firebase/config";

const LobbyPage = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState();

   useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            setUser(user);
            setIsLoggedIn(true);
         } else {
            setIsLoggedIn(false);
         }
      });
   }, []);

   return (
      <>
         <Navbar isLoggedIn={isLoggedIn} user={user} />
         <section id="lobby-section">
            <div className="user-info">
               <UserInfo isLoggedIn={isLoggedIn} userDetails={user} />
            </div>
            <div className="leaderboard-wrapper">
               <LeaderBoard />
            </div>
         </section>
      </>
   );
};

export default LobbyPage;
