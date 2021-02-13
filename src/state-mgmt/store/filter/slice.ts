import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDate } from "./types";

type SliceState = IDate;

const date = new Date();

const initState: SliceState = {
  startDate: new Date(date.getFullYear(), date.getMonth(), 1),
  endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initState as SliceState,
  reducers: {
    requestFilterAction: (state, action: PayloadAction<IDate>) => {},
    requestFilterActionSuccess: (state, action: PayloadAction<IDate>) => {
      const startDate = action.payload.startDate;
      const endDate = action.payload.endDate;
      state.startDate = startDate;
      state.endDate = endDate;
    },
    requesFilterActionFailure: (state, action: PayloadAction<Error>) => {},
  },
});

export const {
  requesFilterActionFailure,
  requestFilterAction,
  requestFilterActionSuccess,
} = filterSlice.actions;

export default filterSlice.reducer;
