import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../utils/tweetsSlice';

const Results = () => {

  const dispatch = useDispatch();

  const loading = useSelector(store => store.tweets.isLoading);
  const summarizedDataArr = useSelector(store => store.tweets.summaryData);
  const usernameArr = useSelector(store => store.tweets.summaryUsername);

  useEffect(() => {
    console.log("result mounted");
  },[]);


  return (
      <>
      {console.log("inside result")}
      <div>
        <div className='mt-5 text-2xl text-center'>Summarized Tweets</div>
        <div className='border border-black mt-1 w-screen text-center text-black p-4 flex flex-wrap justify-center '>
          {summarizedDataArr.map((data,index) => (
            <div key={index} className='flex flex-col h-[350px] w-[300px] text-black bg-white rounded-lg shadow-lg overflow-scroll p-4 m-2'>
              <div className='text-center font-bold p-2'>Summary for {usernameArr[index]} </div>
              <div className='text-left p-2'>{data}</div>
            </div>))}
        </div>
      </div> 
      </>

  )
}

export default Results