import { createSlice } from "@reduxjs/toolkit";



const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState: {
        searchQuery : ''
    },
    reducers:{
        setSearchQuery(state, action){
            state.searchQuery = action.payload
        }
    }
})

export const {setSearchQuery} = searchQuerySlice.actions
export default searchQuerySlice.reducer