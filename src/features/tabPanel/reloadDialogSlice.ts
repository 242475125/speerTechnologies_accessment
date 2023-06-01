import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "../../app/store";

const reloadDialogSlice = createSlice({
    name: 'reloadDialog',
    initialState: {
        status: false,
    },
    reducers: {
        setDialogStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setDialogStatus } = reloadDialogSlice.actions;
export const selectDialogStatus = (state: RootState): boolean => state.reloadDialog.status;
export default reloadDialogSlice.reducer