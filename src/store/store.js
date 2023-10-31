import { configureStore } from "@reduxjs/toolkit";
import instagram from "../reducers/instagram";

export const store = configureStore({
  reducer: {
    data: instagram,
  },
});
