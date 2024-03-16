import { configureStore } from '@reduxjs/toolkit';
import tweetsReducer from './tweetsSlice';

const appStore = configureStore({
    reducer : {
        tweets : tweetsReducer,
    }
})

export default appStore;

