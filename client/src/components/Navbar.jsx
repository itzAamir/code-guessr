import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SuggestionBox from "./SuggestionBox";
import firebase from "firebase/app";

const NavBar = ({ isLoggedIn }) => {
   const [showModal, setShowModal] = useState(false);

   const handleClose = () => setShowModal(false);
   const handleShow = () => setShowModal(true);

   const handleLogout = () => {
      firebase
         .auth()
         .signOut()
         .then(() => {
            // SignedOut
         })
         .catch((err) => {
            alert(err.message);
         });
   };

   return (
      <Navbar
         bg="dark"
         variant="dark"
         style={{
            boxShadow: "0 0 8px black",
            position: "sticky",
            width: "100%",
            top: 0,
            zIndex: "5",
         }}
      >
         <Navbar.Brand>CODE GUESSR 🤔</Navbar.Brand>
         <Nav className="mr-auto"></Nav>
         <Form inline>
            <Button
               variant="outline-info"
               className="mr-3"
               onClick={handleShow}
            >
               Suggestion Box
            </Button>
            <SuggestionBox onShow={showModal} onClose={handleClose} />
            {isLoggedIn && (
               <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
               </Button>
            )}
         </Form>
      </Navbar>
   );
};

export default NavBar;
