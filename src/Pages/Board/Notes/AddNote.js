import React, { useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { context } from "../BoardList/BoardList";
import Items from "../../../Components/Items/Items";
import { useForm } from "react-hook-form";
import { Notes } from "../../../Schema/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNotes, updateNote } from "../../../API/NotesAPI";
import moment from "moment";

export const AddNote = () => {
  const data = useContext(context);
  const getUser = JSON.parse(localStorage.getItem("user"));

  const {
    addNoteHandleClose,
    showAddNoteModal,
    totalBoards,
    isEditing,
    noteToEdit,
  } = data;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Notes),
  });

  const priority = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  const titles = totalBoards?.map((board) => board.title);

  const submit = async (data) => {
    try {
      const selectedBoardTitle = data.boards;
      const selectedBoard = totalBoards.find(
        (board) => board.title === selectedBoardTitle
      );
      const boardId = selectedBoard ? selectedBoard.id : null;

      const postData = {
        userID: getUser.uuid,
        ...data,
        boardId: boardId,
        time: new Date(),
      };

      if (isEditing) {
        postData.id = noteToEdit.id;
        await updateNote(postData)
          .then((response) => {
            console.log("Note updated successfully:", response);
            reset();
            addNoteHandleClose();
          })
          .catch((err) => {
            console.error("Error updating note:", err);
          });
      } else {
        await addNotes(postData)
          .then((response) => {
            console.log("Note added successfully:", response);
            reset();
            addNoteHandleClose();
          })
          .catch((err) => {
            console.error("Error adding note:", err);
          });
      }
    } catch (err) {
      console.log("🚀 ~ file: AddNote.js:55 ~ submit ~ err:", err);
    }
  };

  return (
    <div>
      <Form>
        <Modal show={showAddNoteModal} onHide={addNoteHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Note" : "Add Note"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                {...register("title")}
                defaultValue={isEditing ? noteToEdit.title : ""}
              />
              <span className="text-danger ms-1">{errors?.title?.message}</span>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: "none" }}
                {...register("content")}
                defaultValue={isEditing ? noteToEdit.content : ""}
              />
              <span className="text-danger ms-1">
                {errors?.content?.message}
              </span>
            </Form.Group>
            <Row>
              <Col>
                <div>
                  <Form.Label>Priority*</Form.Label>
                  <Items
                    style={{
                      width: "200px",
                    }}
                    control={control}
                    options={priority}
                    name="priority"
                    searchable={false}
                    className="fixed-w"
                    defaultValue={isEditing ? noteToEdit.priority.value : ""}
                  />{" "}
                  <span className="text-danger ms-1">
                    {errors?.priority?.value?.message}
                  </span>
                </div>
              </Col>
              <Col>
                <div>
                  <Form.Label>Boards</Form.Label>
                  <Items
                    style={{
                      width: "200px",
                    }}
                    control={control}
                    options={titles}
                    name="boards"
                    searchable={false}
                    className="fixed-w"
                    defaultValue={isEditing ? noteToEdit?.board?.value : ""}
                  />{" "}
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={addNoteHandleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit(submit)}
            >
              {isEditing ? "Save Changes" : "Add Note"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};
