import React from "react";
import { Modal, Button } from "react-bootstrap";
import firebase from "firebase/app";
import axios from "axios";
import { useHistory } from "react-router-dom";

const GameOverModal = ({
   onShow,
   onClose,
   score,
   isLoggedIn,
   lastTopScorer,
   user,
}) => {
   const history = useHistory();

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
            <b>Total Score: {score}</b>
         </Modal.Body>
         {score > lastTopScorer && (
            <Modal.Body>
               <b>YAY👏 you've made it to the top 10 in Leaderboard. </b>
               <br />
               {isLoggedIn ? (
                  <span>
                     Click on <b>Submit</b> button to get featured.
                  </span>
               ) : (
                  <span>
                     <br />
                     <button
                        className="btn btn-primary btn-sm"
                        onClick={handleLogin}
                     >
                        Login
                     </button>{" "}
                     to get featured.
                  </span>
               )}
            </Modal.Body>
         )}
         <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="secondary" onClick={() => history.go(0)}>
               Restart
            </Button>
            {isLoggedIn && score > lastTopScorer && (
               <Button variant="primary" onClick={handleSubmit}>
                  Submit
               </Button>
            )}
         </Modal.Footer>
      </Modal>
   );
};

export default GameOverModal;
