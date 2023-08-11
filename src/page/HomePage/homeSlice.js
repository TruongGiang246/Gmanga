import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "detail",
    initialState: {
        hot: "",
        thumbnail: "",
        title: "",
    },
    reducers: {
        dispatchComicsDetail: (state, action) => {
            console.log(state, action)
            state.hot = action.payload.hot
            state.thumbnail = action.payload.thumbnail
            state.title = action.payload.title
        }
    }
})