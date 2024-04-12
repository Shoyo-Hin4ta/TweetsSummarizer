import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../utils/tweetsSlice';

const Results = () => {

  const dispatch = useDispatch();

  const loading = useSelector(store => store.tweets.isLoading);
  const summarizedDataArr1 = useSelector(store => store.tweets.summaryData);
  const summarizedDataArr =  summarizedDataArr1.slice().reverse();
  const usernameArr = useSelector(store => store.tweets.summaryUsername);

  
  useEffect(() => {
    // console.log("result mounted");
  },[]);


  return (
      <>
      {/* {console.log("inside result")} */}
      <div className=''>
        <div className='mt-5 text-2xl text-center font-bold'>Summarized Tweets</div>
        <div className='border mt-2 w-screen text-center text-black p-8 flex flex-wrap justify-center bg-red-100  gap-2'>
          {summarizedDataArr.map((data,index) => (
            <div key={index} className='flex flex-col h-[350px] sm:w-3/12 text-black bg-white rounded-lg shadow-lg overflow-scroll p-4'>
              <div className='text-center font-bold p-2'>Summary for {usernameArr[index]} </div>
              <div className='text-left p-2'>{data}</div>
            </div>))}
        </div>
      </div> 
      </>

  )
}

export default Results