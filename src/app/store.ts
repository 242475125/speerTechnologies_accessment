import { configureStore } from '@reduxjs/toolkit'
import {activitiesApi} from "../services/activities";
import tabPanelSlice from "../features/tabPanel/tabPanelSlice";
import reloadDialogSlice from "../features/tabPanel/reloadDialogSlice";

// Configure the Redux store
export const store = configureStore({
    reducer: {
        [activitiesApi.reducerPath]: activitiesApi.reducer,
        tabPanel: tabPanelSlice,
        reloadDialog: reloadDialogSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(activitiesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;