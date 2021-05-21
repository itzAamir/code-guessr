import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SuggestionBox = ({ onShow, onClose }) => {
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
                  <Form.Control type="text" placeholder="Type here..." />
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
               Close
            </Button>
            <Button variant="primary" onClick={onClose}>
               Submit
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default SuggestionBox;
