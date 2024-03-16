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
        addSummaryUsername : (state, action) => {
            state.summaryUsername.push(action.payload);
        },
        changeShowResults : (state,action) => {
            state.showResults = true
        }
    }
});

export const {addTweets, addSummary, changeShowResults, addSummaryUsername} = tweetsSlice.actions;

export default tweetsSlice.reducer;