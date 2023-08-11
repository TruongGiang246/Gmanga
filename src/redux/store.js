import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../page/HomePage/homeSlice";
import dispatchIdPage from "../page/ComicsDetail/dispatchIdPage";
import filterSlice from "../page/Filter/filterSlice";
const store = configureStore({

    reducer: {
        detail: homeSlice.reducer,
        idPage: dispatchIdPage.reducer,
        filter: filterSlice.reducer
    }
})
export default store