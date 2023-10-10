import React, { createContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getAllNotes } from "../../../../API/NotesAPI";
import edit from "../../../../../src/assets/edit.png";
import deleteNotes from ".././../../../assets/table-trash.svg";
import { DeleteNote } from "../DeleteNote/DeleteNote";

export const noteContext = createContext();

export const NotesList = ({ handleEditNote }) => {
  const [totalNotes, SetTotalNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const deleteNoteHandleClose = () => setShowDeleteNoteModal(false);
  const deleteNoteHandleShow = (id) => {
    setCurrentNoteId(id);
    setShowDeleteNoteModal(true);
  };

  const getUsers = async () => {
    try {
      const displayGameData = await getAllNotes();

      if (displayGameData.status === 200) {
        SetTotalNotes(displayGameData.data);
      }
    } catch (err) {
      console.log("🚀 ~ file: BoardList.js:44 ~ getUsers ~ err:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="d-flex ">
      <noteContext.Provider
        value={{
          showDeleteNoteModal,
          deleteNoteHandleClose,
          currentNoteId,
          getUsers,
        }}
      >
        <DeleteNote />
      </noteContext.Provider>
      {totalNotes.map((note) => (
        <Card
          key={note.id}
          style={{ width: "14rem", marginBottom: "10px" }}
          className="m-2"
          // style={{
          //   backgroundColor:
          //     note?.priority?.value === "High"
          //       ? "#c7c786"
          //       : note?.priority?.value === "Medium"
          //       ? "#c7c7866"
          //       : "red",
          // }}
        >
          <Card.Body>
            <Card.Title>{note?.title}</Card.Title>
            <Card.Text style={{ overflow: "auto" }}>{note?.content}</Card.Text>
            <Card.Text>
              Priority: <span>{note?.priority?.value}</span>
            </Card.Text>
            {note && note?.board?.value && (
              <Card.Text>Board: {note?.board?.value}</Card.Text>
            )}
          </Card.Body>

          <div className="icon d-flex justify-content-end me-1 mb-1">
            <div className="me-1" onClick={() => handleEditNote(note)}>
              <img src={edit} width={12} alt="edit" />
            </div>
            <div className="me-1" onClick={() => deleteNoteHandleShow(note.id)}>
              <img src={deleteNotes} width={12} alt="delete" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
