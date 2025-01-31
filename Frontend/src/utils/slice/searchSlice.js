import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name: 'showSearch',
    initialState: {
        showSearch: false
    },
    reducers:{
        toogleSearch(state, action){
            state.showSearch = action.payload
        }
        
    }
})

export const {toogleSearch}  = searchSlice.actions
export default searchSlice.reducer 