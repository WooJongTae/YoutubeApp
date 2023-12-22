import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const loginUser = (userData) => {
//   return axios.post("/api/users/login", userData).then((res) => {
//     return res.data;
//   });
// };
export const loginUser = createAsyncThunk("user/loginUser", (userData) => {
  return axios
    .post("/api/users/login", userData)
    .then((response) => response.data);
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  (userData) => {
    return axios
      .post("/api/users/register", userData)
      .then((response) => response.data);
  }
);

export const authUser = createAsyncThunk("user/authUser", () => {
  return axios.get("/api/users/auth").then((response) => {
    console.log(response);
    return response.data;
  });
});

export const logoutUser = createAsyncThunk("user/logoutUser", () => {
  return axios.get("/api/users/logout").then((response) => {
    console.log(response);
    return response.data;
  });
});
