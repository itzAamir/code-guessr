import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import firebase from "firebase/app";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoggedOutMessage = ({ onLogin }) => {
   return (
      <>
         <b>YAY👏 you've made it to the top 10 in Leaderboard.</b>
         <br />
         <br />
         <span>
            <button className="btn btn-primary btn-sm" onClick={onLogin}>
               Login
            </button>{" "}
            to get featured.
         </span>
      </>
   );
};

const LoggedInMessage = () => {
   return (
      <>
         <b>YAY👏 you've made it to the top 10 in Leaderboard.</b>
         <br />
         <span>
            Click on <b>Submit</b> button to get featured.
         </span>
      </>
   );
};

const GameOverModal = ({
   onShow,
   onClose,
   score,
   isLoggedIn,
   lastTopScorer,
   user,
   topScorers,
   isGameFinished,
   correctAnswer,
}) => {
   const history = useHistory();
   const [isLoggedInAndTopScored, setIsLoggedInAndTopScored] = useState(false);
   const [isTopScored, setIsTopScored] = useState(false);

   useEffect(() => {
      if (user) {
         topScorers.forEach((e) => {
            if (e.uid === user.uid) {
               if (score > e.score) {
                  setIsLoggedInAndTopScored(true);
               }
               return;
            }
         });
      }
      if (score > lastTopScorer) {
         setIsTopScored(true);
      }
   }, [topScorers, isLoggedIn, user, score, lastTopScorer]);

   const handleLogin = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
         .auth()
         .signInWithPopup(provider)
         .then((result) => {
            // SignedIn
         })
         .catch((err) => {
            alert(err.message);
         });
   };

   const handleSubmit = () => {
      const data = {
         uid: user.uid,
         username: user.displayName,
         score: score,
      };
      axios
         .post("/api/top-scorer", data)
         .then((res) => {
            if (res.data.message === "ok") {
               alert("Your score have been featured on Leader-Board section");
               history.push("/lobby");
            }
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <Modal
         show={onShow}
         onHide={onClose}
         aria-labelledby="contained-modal-title-vcenter"
         centered
         backdrop="static"
         keyboard={false}
      >
         <Modal.Header>
            <Modal.Title>Game Over</Modal.Title>
         </Modal.Header>

         <Modal.Body>
            <b>Correct Answer: {correctAnswer}</b>
            <br />
            <b>Total Score: {score}</b>
            <br />
            <br />
            {isLoggedInAndTopScored && <LoggedInMessage />}
            {!isLoggedIn && isTopScored && (
               <LoggedOutMessage onLogin={handleLogin} />
            )}
         </Modal.Body>

         <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="secondary" onClick={() => history.go(0)}>
               Restart
            </Button>
            {isLoggedInAndTopScored && (
               <Button variant="primary" onClick={handleSubmit}>
                  Submit
               </Button>
            )}
         </Modal.Footer>
      </Modal>
   );
};

export default GameOverModal;
