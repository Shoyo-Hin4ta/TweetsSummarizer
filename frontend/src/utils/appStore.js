import { configureStore } from '@reduxjs/toolkit';
import tweetsReducer from './tweetsSlice';
import userReducer from './userSlice';

const appStore = configureStore({
    reducer : {
        tweets : tweetsReducer,
        user : userReducer,
    }
})

export default appStore;

