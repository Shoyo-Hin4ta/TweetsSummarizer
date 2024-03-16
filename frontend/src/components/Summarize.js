import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import Results from './Results';
import  { useDispatch, useSelector } from 'react-redux';
import { addTweets, changeShowResults } from '../utils/tweetsSlice';
import { addSummary,addSummaryUsername } from '../utils/tweetsSlice';
import openAPI from '../utils/openAPI';
import { auth } from '../utils/firebase';

const Summarize = () => {

  console.log("start");

  const dispatch = useDispatch();

  const twitterUsername = useRef(null);

  // const data = useSelector(store => store.tweets.data);
  // console.log("getting twitter array data ");

  const btnStatus = useSelector(store => store.tweets.showResults);

  const handleClick = async() => {

      const valueToSend = twitterUsername.current.value + "_5";
      console.log("http://localhost:8000/api/get_tweets/"+ valueToSend);
  
      const response = await axios.get("http://localhost:8000/api/get_tweets/"+ valueToSend);
  
      //save this data in store;
      // console.log(response.data);
      // dispatch(addTweets(response.data));

      const twitterData = response.data
      console.log("tweet data added in store - state updated");

      const tweetsTextArr = twitterData.map((tweet) => {
        return tweet.Text;
      })
    
      const unsummarizedText =tweetsTextArr.map((tweet, index) => {
        return "Tweet "+ index + " : " + tweet
      }).join(', ');

      const prompt = "These are 5 recent tweets of the twitter user "+ twitterUsername  +" : "+ unsummarizedText +". Summarize them";
      const summarizedData  = await openAPI(prompt);

      console.log("got response from open api");
      dispatch(addSummaryUsername(twitterUsername.current.value))
      dispatch(addSummary(summarizedData))

      console.log("summary added - state updated");

      

      dispatch(changeShowResults());
  }

  return (
    <>
    <div className='border border-red-300 mt-36 w-4/5 flex flex-col items-center'>
        <div className='text-4xl m-2 mb-9'>Get Tweets Summary</div>
        <input ref = {twitterUsername} className= "w-2/5 p-4 rounded-lg" type= "text" placeholder='Enter the twitter username'/>
        <button onClick={handleClick} className='m-2 bg-blue-400 p-3 w-32 rounded-lg mt-7'> Summarize ! </button>
    </div>
    {console.log("reached till result box")}
    {btnStatus && <Results twitterUsername = {twitterUsername.current.value} />}
    </>
  )
}

export default Summarize