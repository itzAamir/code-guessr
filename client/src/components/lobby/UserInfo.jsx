import React from "react";
import LoginForm from "./LoginForm";

const UserInfo = ({ isLoggedIn, userDetails }) => {
   return (
      <>
         <h3>Hello {userDetails ? userDetails.displayName : "User"} 🙋‍♂️</h3>
         <hr />
         <div className="instruction-div">
            <h4>Instructions :-</h4>
            <p>
               1) Want to sign in? Click on <b>Sign In with Google</b> button or
               you can directly <b>Start The Game</b>.
            </p>
            <p>
               2) Guess which language being displayed on the screen and select
               the options accordingly.
            </p>
            <p>
               3) If you manage to score more than other players. You'll find
               your name in the <b>LEADERBOARD</b> section.
            </p>
            <LoginForm isLoggedIn={isLoggedIn} />
         </div>
      </>
   );
};

export default UserInfo;
