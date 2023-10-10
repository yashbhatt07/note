import axios from "axios";

export const addNotes = async (userData) => {
  return await axios
    .post("notes", userData)
    .then((response) => {
      return response;
    })

    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const getAllNotes = async () => {
  return await axios
    .get("notes")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteNote = async (boardId) => {
  return await axios
    .delete(`notes/${boardId}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const updateNote = async (id, admin) => {
  return await axios
    .put(`notes/${id}`, admin)
    .then((res) => {
      console.log("🚀 ~ file: API.js:53 ~ .then ~ res:");
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
