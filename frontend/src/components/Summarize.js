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

      dispatch(setIsLoading(true));

      const valueToSend = twitterUsername.current.value;
  
      const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"/get_tweets/"+ valueToSend);
      // console.log(response);

      //save this data in store;
      // console.log(response.data);
      // dispatch(addTweets(response.data));

      const twitterData = response.data
      const tweetsTextArr = twitterData.map((tweet) => {
        return tweet.Text;
      })
    
      const unsummarizedText =tweetsTextArr.map((tweet, index) => {
        return "Tweet "+ index + " : " + tweet
      }).join(', ');

      const prompt = "These are 5 recent tweets of the twitter user "+ twitterUsername  +" : "+ unsummarizedText +". Summarize them";
      const summarizedData  = await openAPI(prompt);

    // if user is logged in
    if(auth.currentUser)
    {
     const response_from_db = await axios.put(process.env.REACT_APP_BACKEND_URL+'/add_tweets',{
        email: auth.currentUser.email,
        twitterUsername: twitterUsername.current.value,
        summary: summarizedData
     });
     dispatch(userSummaryData(response_from_db.data.tweetsList.reverse()));
     dispatch(userTwitterUsername(response_from_db.data.twitterUsername.reverse()));
     dispatch(setIsLoading(false))
    }
    else{
      dispatch(addSummaryUsername(twitterUsername.current.value));
      dispatch(addSummary(summarizedData));
      dispatch(setIsLoading(false));
    }
  }

  return (
    <>
    <div className='mt-36 w-4/5 flex flex-col items-center'>
        <div className="sm:w-max m-4 mb-6 w-3/4">
            <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white sm:pr-5 p-0 sm:text-5xl text-2xl text-center font-bold text-black">Summarize Tweets</h1>
        </div>        
            <input ref = {twitterUsername} className= "sm:w-2/5 p-4 w-full rounded-lg" type= "text" placeholder='Enter the twitter username'/>
            <button onClick={handleClick} className='m-2 bg-blue-400 p-3 w-32 rounded-lg mt-7'> Summarize ! </button>
    </div>
    {loading && 
      <div className="mt-8 px-6 py-4 text-base font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">Scraping and summarizing the data...</div>
    }
    {summaryData.length!==0 ? <Results /> : null}
    </>
  )
}

export default Summarize


