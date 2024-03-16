import { createSlice } from "@reduxjs/toolkit";


const tweetsSlice = createSlice({
    name : "tweets",
    initialState : {
        showResults : false,
        data : null,
        summaryData : [],
        summaryUsername : []
    },
    reducers : {
        addTweets : (state, action) => {
            state.data = action.payload;
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
        changeShowResults : (state,action) => {
            state.showResults = true
        },
        hideShowResults : (state, action) => {
            state.showResults = false;
        }
    }
});

export const {addTweets, addSummary, changeShowResults, addSummaryUsername, clearSummaryData, hideShowResults} = tweetsSlice.actions;

export default tweetsSlice.reducer;