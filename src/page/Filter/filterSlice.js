import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "filter",
    initialState: {
        search: "",
        genre: "",
        rank: "",
        type: "",
    },
    reducers: {
        dispatchSearchFilter: (state, action) => {
            console.log(state, action)
            state.search = action.payload.search
            state.type = action.payload.type
        },
        dispatchGenreFilter: (state, action) => {
            state.genre = action.payload.genre
            state.type = action.payload.type
        },
        dispatchRankFilter: (state, action) => {
            
            state.rank = action.payload.rank
            state.type = action.payload.type
        }
    }
})