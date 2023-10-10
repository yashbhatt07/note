import { createContext, useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { NewBoard } from "../NewBoard/NewBoard";
import { getAllBoards } from "../../../API/BoardAPI";
import { useForm } from "react-hook-form";
import SideBar from "../../SideBar/SideBar";
import { AddNote } from "../Notes/AddNote";
import { NotesList } from "../Notes/NotesList/NotesList";
export const context = createContext();

export const BoardList = () => {
  const [show, setShow] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const addNoteHandleClose = () => setShowAddNoteModal(false);
  const addNoteHandleShow = () => setShowAddNoteModal(true);
  const [showEditNoteModal, setShowEditNoteModal] = useState(false);
  const editNoteHandleClose = () => setShowEditNoteModal(false);
  const editNoteHandleShow = () => setShowEditNoteModal(true);
  const [value, setValue] = useState({ label: "", value: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const handleEditNote = (note) => {
    setIsEditing(true);
    setNoteToEdit(note);
    addNoteHandleShow();
  };

  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [boards, setBoards] = useState({
    userId: getUser.userId,
    title: "",
  });
  const [totalBoards, setTotalBoards] = useState([]);
  console.log(
    "🚀 ~ file: BoardList.js:24 ~ BoardList ~ totalBoards:",
    totalBoards
  );

  const getUsers = async () => {
    try {
      const displayGameData = await getAllBoards();

      if (displayGameData.status === 200) {
        setTotalBoards(displayGameData.data);
      }
    } catch (err) {
      console.log("🚀 ~ file: BoardList.js:44 ~ getUsers ~ err:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  // const titles = totalBoards?.map((board) => board.title);

  return (
    <div>
      <div>
        <context.Provider
          value={{
            show,
            handleClose,
            setBoards,
            boards,
            handleShow,
            value,
            setValue,
            totalBoards,
            getUsers,
            addNoteHandleClose,
            showAddNoteModal,
            showEditNoteModal,
            editNoteHandleClose,
            noteToEdit,
            isEditing,
            // editNoteHandleShow,
          }}
        >
          <SideBar />
          <NewBoard />
          <AddNote />
        </context.Provider>
      </div>
      <div className="d-flex justify-content-end mt-2 ">
        <button
          className="btn btn-outline-primary me-2"
          onClick={addNoteHandleShow}
          type="button"
        >
          Add Note
        </button>
      </div>
      <div style={{ margin: "0 0 0 213px" }}>
        <NotesList handleEditNote={handleEditNote} />
      </div>
    </div>
  );
};
