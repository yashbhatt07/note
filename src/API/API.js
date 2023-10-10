import axios from "axios";

export const addUser = async (userData) => {
  console.log("🚀 ~ file: API.js:4 ~ addUser ~ userData:", userData);
  return await axios
    .post("users", userData)
    .then((response) => {
      console.log("🚀 ~ file: API.js:8 ~ .then ~ response:", response);
      return response;
    })

    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const login = async (loginData) => {
  const { email, password } = loginData;
  return await axios
    .get(`users?email=${email}&password=${password}`)
    .then((res) => {
      return res.data[0];
    })
    .catch((err) => {
      console.error(err);
    });
};
