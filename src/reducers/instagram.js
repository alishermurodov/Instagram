import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datas: [],
  messageModal:false,
  searchModal:false,
  notificationModal:false
};
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
   handleChangeSearch : (state, action) => {
      state.searchModal = action.payload
    },
    handleChangeNotification: (state, action) => {
      state.notificationModal = action.payload
    }
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
// export const { } =
//   todosSlice.actions;

export const {handleChangeSearch, handleChangeNotification} = todosSlice.actions

export default todosSlice.reducer;