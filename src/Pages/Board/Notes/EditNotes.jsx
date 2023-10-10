import React, { useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { context } from "../BoardList/BoardList";
import Items from "../../../Components/Items/Items";
import { useForm } from "react-hook-form";
import { Notes } from "../../../Schema/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNotes } from "../../../API/NotesAPI";
import moment from "moment";

export const EditNotes = () => {
    const data = useContext(context);
    const getUser = JSON.parse(localStorage.getItem("user"));

    const { totalBoards, showEditNoteModal, editNoteHandleClose } = data;
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
    console.log("🚀 ~ file: AddNote.js:20 ~ AddNote ~ errors:", errors);
    const priority = [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
    ];

    const titles = totalBoards?.map((board) => board.title);

    const submit = async (data) => {
        console.log("🚀 ~ file: AddNote.js:33 ~ submit ~ data:", data);
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

            await addNotes(postData)
                .then((response) => {
                    console.log("Note added successfully:", response);
                    reset();
                    editNoteHandleClose();
                })
                .catch((err) => {
                    console.error("Error adding note:", err);
                });
        } catch (err) {
            console.log("🚀 ~ file: AddNote.js:55 ~ submit ~ err:", err);
        }
    };

    return (
        <div>
            <Form>
                <Modal show={showEditNoteModal} onHide={editNoteHandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Notes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                {...register("title")}
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
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );
};
