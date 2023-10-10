import axios from "axios";

export const addBoards = async (userData) => {
  console.log("🚀 ~ file: BoardAPI.js:4 ~ addBoards ~ userData:", userData);
  return await axios
    .post("boards", userData)
    .then((response) => {
      return response;
    })

    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const getAllBoards = async () => {
  return await axios
    .get("boards")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deleteBoard = async (boardId) => {
  return await axios
    .delete(`boards/${boardId}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};
