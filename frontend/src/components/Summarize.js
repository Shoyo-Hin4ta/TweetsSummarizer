import React, { useEffect, useRef } from 'react'
import axios from "axios";
import Results from './Results';
import  { useDispatch, useSelector } from 'react-redux';
import { userSummaryData, userTwitterUsername, addSummary,addSummaryUsername, setIsLoading } from '../utils/tweetsSlice';
import openAPI from '../utils/openAPI';
import { auth } from '../utils/firebase';

const Summarize = () => {
  const dispatch = useDispatch();
  const twitterUsername = useRef(null);

  const summaryData = useSelector(store => store.tweets.summaryData);
  const user = useSelector(store => store.user)
  const loading = useSelector(store => store.tweets.isLoading);

  useEffect((() => {
    const getUserData = async() => {
          
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"/get_all_tweets/"+auth.currentUser.email);
      dispatch(userSummaryData(response.data.tweetsList.reverse()));
      dispatch(userTwitterUsername(response.data.twitterUsername.reverse()));

    }
    if(user){
      getUserData();
    }
  }),[user]);

  const handleClick = async() => {
    try {
      dispatch(setIsLoading(true));
        
      const valueToSend = twitterUsername.current.value;
      
      // Get tweets
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"/get_tweets/"+ valueToSend);

      const tweetsTextArr = response.data.map(tweet => tweet.Text).filter(text => text);

      const unsummarizedText = tweetsTextArr.map((tweet, index) => 
          `Tweet ${index + 1}: ${tweet}`
      ).join('\n');

      const prompt = `Here are recent tweets from ${valueToSend}:\n${unsummarizedText}\nPlease provide a concise summary of the main themes and topics discussed in these tweets.`;
      
      const summarizedData = await openAPI(prompt);
      
        // Save data
        if (auth.currentUser) {
            const response_from_db = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/add_tweets`,
                {
                    email: auth.currentUser.email,
                    twitterUsername: valueToSend,
                    summary: summarizedData
                }
            );
            dispatch(userSummaryData(response_from_db.data.tweetsList.reverse()));
            dispatch(userTwitterUsername(response_from_db.data.twitterUsername.reverse()));
        } else {
            dispatch(addSummaryUsername(valueToSend));
            dispatch(addSummary(summarizedData));
        }
    } catch (error) {
        console.error("Error:", error);
        // You might want to add a toast or error message component here
        alert(error.message || "An error occurred while processing your request");
    } finally {
        dispatch(setIsLoading(false));
    }
};

  return (
    <>
    <div className='mt-36 w-4/5 flex flex-col items-center'>
        <div className="sm:w-max m-4 mb-6 w-3/4">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white sm:pr-5 p-0 sm:text-5xl text-2xl text-center font-bold text-black">Summarize Tweets</h1>
        </div>        
            <input ref = {twitterUsername} className= "sm:w-2/5 p-4 w-full rounded-lg text-sm sm:text-base" type= "text" placeholder='Enter the twitter username without @. It takes time be patient.'/>
            <button onClick={handleClick} className='m-2 bg-blue-400 p-3 w-32 rounded-lg mt-7'> Summarize ! </button>
    </div>
    {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-700">Analyzing tweets...</p>
                </div>
            </div>
        </div>
    )}
    {summaryData.length!==0 ? <Results /> : null}
    </>
  )
}

export default Summarize


