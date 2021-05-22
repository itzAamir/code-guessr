import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const SuggestionBox = ({ onShow, onClose, user, isLoggedIn }) => {
   const [suggestionText, setSuggestionText] = useState("");

   const submitSuggestion = () => {
      if (!user) {
         alert(
            "To submit suggestion, you need to login. (For security reasons)"
         );
         return;
      }

      if (suggestionText.trim() !== "") {
         const data = {
            uid: user.uid,
            username: user.displayName,
            suggestion: suggestionText,
         };
         axios
            .post("/api/suggestion", data)
            .then(() => {
               alert("Suggestion has been submitted");
            })
            .catch((err) => {
               alert(err);
            });
         onClose();
         return;
      }
   };

   return (
      <Modal
         show={onShow}
         onHide={onClose}
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title>Suggestion Box 📮</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group controlId="formBasicEmail">
                  <Form.Label>Want to suggest something?</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Type here..."
                     onChange={(e) => setSuggestionText(e.target.value)}
                  />
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
               Close
            </Button>
            <Button variant="primary" onClick={submitSuggestion}>
               Submit
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default SuggestionBox;
