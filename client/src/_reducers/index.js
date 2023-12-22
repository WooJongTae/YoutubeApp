import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user_reducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
