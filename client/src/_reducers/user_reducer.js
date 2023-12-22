import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  authUser,
  logoutUser,
} from "../user_actions/user_actions";

const loadFromStorage = (key) => {
  const stroedValue = localStorage.getItem(key);
  return stroedValue ? JSON.parse(stroedValue) : null;
};
const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
// 액션 지울지 생각해봐야겠다
export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      loginSuccess: loadFromStorage("loginSuccess") || {},
      register: loadFromStorage("registerUser") || {},
      userData: loadFromStorage("userData") || {},
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.data.loginSuccess = { ...state.data.loginSuccess };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data.loginSuccess = {
          ...state.data.loginSuccess,
          ...action.payload,
        };
        saveToStorage("loginSuccess", state.data.loginSuccess);
      })
      .addCase(loginUser.rejected, (state) => {
        state.data.loginSuccess = "에러";
      })
      .addCase(registerUser.pending, (state) => {
        state.data.register = { ...state.data.register };
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data.register = { ...state.data.register, ...action.payload };
        saveToStorage("registerUser", state.data.register);
      })
      .addCase(registerUser.rejected, (state) => {
        state.data.register = "에러";
      })
      .addCase(authUser.pending, (state) => {
        state.data.userData = { ...state.data.userData };
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.data.userData = { ...action.payload };
        saveToStorage("userData", state.data.userData);
      })
      .addCase(authUser.rejected, (state) => {
        state.data.userData = "에러";
      })
      .addCase(logoutUser.pending, (state) => {
        state.data = {};
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = {};
        localStorage.removeItem("loginSuccess");
        localStorage.removeItem("register");
        localStorage.removeItem("userData");
      })
      .addCase(logoutUser.rejected, (state) => {
        state.data = "에러";
      });
  },
});

// 각 케이스 리듀서 함수에 대해 액션 생성자가 생성된다.
// export const {  } = userSlice.actions;

export default userSlice.reducer;
