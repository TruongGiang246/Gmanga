import { createSelector } from "@reduxjs/toolkit";

const hotDetail = (state) => state.detail.hot
const hotThumbnail = (state) => state.detail.thumbnail
const hotTitle = (state) => state.detail.title

const idPage = (state) => state.idPage.id
const indexPage = (state) => state.idPage.index
const chapterId = (state) => state.idPage.chapterId

const filterSearch = (state) => state.filter.search
const filterGenre = (state) => state.filter.genre
const filterRank = (state) => state.filter.rank
const filterType = (state) => state.filter.type

export const handleRequest = createSelector(
    hotDetail,
    hotThumbnail,
    hotTitle,
    (hot, thumbnail, title) => {
        console.log(thumbnail,title)
        return {hot, thumbnail, title}
    }
)
export const dispatchIdPage = createSelector(
    idPage,
    chapterId,
    indexPage,
    (id,chapterId, index) => {
        return {id, chapterId, index}
    }
)

export const dispatchFilter = createSelector(
    filterSearch,
    filterGenre,
    filterRank,
    filterType,
    (search, genre,rank, type) => {
        // if(!(search === search)){
        //     console.log('search')
        //     const searchText = search.split('/')
        //     return searchText[0]
         
        // }else if(genre){
        //     console.log('genrs')
        //     return genre
        // }
        return ({search, genre,rank, type})
    }
)