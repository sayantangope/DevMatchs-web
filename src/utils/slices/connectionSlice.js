import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    showConnection: (state, action) => action.payload,
  },
});

export const { showConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
