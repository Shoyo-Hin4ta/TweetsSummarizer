import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";

const Summarize = () => {

  const twitterUsername = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(()=> {
    if(isClicked){
      getTweetdata();
    }
  }, [isClicked]);



  const handleClick = () => {
    setIsClicked(true);
  }

  const getTweetdata = async() => {
    const valueToSend = twitterUsername.current.value + "_5";
    console.log("http://localhost:8000/api/get_tweets/"+ valueToSend);

    const response = await axios.get("http://localhost:8000/api/get_tweets/"+ valueToSend);

    console.log(response);
    setIsClicked(false);
}



  return (
    <div className='border border-red-300 absolute top-36 w-4/5 flex flex-col items-center'>
        <div className='text-4xl m-2 mb-9'>Get Tweets Summary</div>
        <input ref = {twitterUsername} className= "w-2/5 p-4 rounded-lg" type= "text" placeholder='Enter the twitter username'/>
        <button onClick={handleClick} className='m-2 bg-blue-400 p-3 w-32 rounded-lg mt-7'> Summarize ! </button>
    </div>
  )
}

export default Summarize