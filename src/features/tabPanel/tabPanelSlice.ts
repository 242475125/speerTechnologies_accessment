import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "../../app/store";

const tabPanelSlice = createSlice({
    name: 'tabPanel',
    initialState: {
        index: 0,
    },
    reducers: {
        setTabs: (state, action) => {
            state.index = action.payload;
        },
    },
});

export const { setTabs } = tabPanelSlice.actions;
export const selectTabsIndex = (state: RootState): number => state.tabPanel.index;
export default tabPanelSlice.reducer