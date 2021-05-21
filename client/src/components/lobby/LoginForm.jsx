import React from "react";
import { Form, Button } from "react-bootstrap";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

const LoginForm = ({ isLoggedIn }) => {
   const history = useHistory();

   const handleSignIn = () => {
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

   return (
      <Form className="mt-4">
         <Button
            className={`btn-${isLoggedIn ? "secondary" : "primary"} mr-3`}
            disabled={isLoggedIn}
            onClick={handleSignIn}
         >
            Sign In With Google
         </Button>
         <Button
            className={`btn-${isLoggedIn ? "primary" : "secondary"}`}
            onClick={() => history.push("/")}
         >
            Start The Game
         </Button>
      </Form>
   );
};

export default LoginForm;
