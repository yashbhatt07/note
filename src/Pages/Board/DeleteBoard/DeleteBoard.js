import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { deleteBoard } from "../../../API/BoardAPI";
import axios from "axios";

export const DeleteBoard = ({
  showDeleteModal,
  handleCloseDeleteModal,
  selectedBoardId,
  setShowDeleteModal,
}) => {
  console.log(
    "🚀 ~ file: DeleteBoard.jsx:6 ~ DeleteBoard ~ selectedBoardId:",
    selectedBoardId
  );

  const handleDeleteBoard = async () => {
    try {
      const response = await axios.delete(`boards/${selectedBoardId}`);

      if (response.status === 200) {
        console.log(`Data with UUID ${selectedBoardId} deleted successfully`);
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      {" "}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>DeleteBoard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Do you want to delete the board?</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={handleDeleteBoard}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
