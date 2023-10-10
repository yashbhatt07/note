import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { context } from "../BoardList/BoardList";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { addBoards } from "../../../API/BoardAPI";

export const NewBoard = () => {
  const data = useContext(context);
  const [error, setError] = useState("");
  const { handleClose, show, setBoards, boards, value, setValue, getUsers } =
    data;
  console.log("🚀 ~ file: NewBoard.jsx:12 ~ NewBoard ~ boards:", boards);
  const uuid = uuidv4();
  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const inputValue = e.target.value;
    console.log(
      "🚀 ~ file: NewBoard.jsx:20 ~ handleChange ~ inputValue:",
      inputValue
    );

    if (inputValue.trim() === "" || inputValue.length === 0) {
      setError("Title is required");
    } else if (inputValue.length < 4) {
      setError("Title length must be at least 4");
    } else if (inputValue.length > 8) {
      setError("Title length must be less than 8");
    } else {
      setError("");
    }

    setValue({ ...value, label: inputValue, value: inputValue });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (value.value.trim() === "" || value.value.length === 0) {
      setError("Title is required");
      return;
    } else if (error) {
      return;
    }
    try {
      const response = await addBoards({
        userId: getUser.userId,
        title: value,
        uuid: uuid,
      });
      console.log("New board created:", response.data);

      setBoards({
        uuid: "",
        title: value,
      });
      getUsers();
      handleClose();
      setValue("");
    } catch (error) {
      console.error("Error creating a new board:", error);
    }
  };

  return (
    <div>
      {" "}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={submit}>
          <Modal.Header closeButton>
            <Modal.Title>Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              size="lg"
              defaultValue={value.value}
              type="text"
              placeholder="Create Board"
              onChange={handleChange}
            />
            <span className="text-danger ms-2">{error}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
