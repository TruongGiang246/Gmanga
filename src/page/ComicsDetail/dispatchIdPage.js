import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "idPage",
    initialState: {
        id: "",
        chapterId: "",
        index: ""
    },
    reducers: {
        dispatchComicsIdPage: (state, action) => {
            state.id = action.payload.id
            state.chapterId = action.payload.chapterId
            state.index = action.payload.index

        }
    }
})