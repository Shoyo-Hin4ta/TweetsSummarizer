import { createSlice } from "@reduxjs/toolkit";


const tweetsSlice = createSlice({
    name : "tweets",
    initialState : {
        isLoading : false,
        summaryData : [],
        summaryUsername : [],
        createUser : false,
    },
    reducers : {
        setCreateUser : (state, action) => {
            state.createUser = !state.createUser
        },
        setIsLoading : (state,action) => {
            state.isLoading = action.payload
        },
        addSummary : (state, action) => {
            state.summaryData.push(action.payload);
        },
        clearSummaryData : (state) => {
            state.summaryData = []
            state.summaryUsername = []
        },
        addSummaryUsername : (state, action) => {
            state.summaryUsername.push(action.payload);
        },
        userSummaryData : (state,action) => {
            state.summaryData = action.payload
        },
        userTwitterUsername : (state,action) => {
            state.summaryUsername = action.payload
        }
    }
});

export const {setCreateUser, setIsLoading, userSummaryData, userTwitterUsername, addSummary, addSummaryUsername, clearSummaryData} = tweetsSlice.actions;

export default tweetsSlice.reducer;