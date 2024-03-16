import React from 'react'
import { useSelector } from 'react-redux';

const Results = ({twitterUsername}) => {


  console.log("start 2 -in results ");

  // const [unsummarizedText, setUnsummarizedText] = useState(null);

  const summarizedDataArr = useSelector(store => store.tweets.summaryData);
  const usernameArr = useSelector(store => store.tweets.summaryUsername);

  console.log("fetching summary store data")
  if(summarizedDataArr.length===0){
    console.log("nothing yet")
    return
  }
  else{
    console.log("got summary data");
  }


  return (
    <div>
    
      { summarizedDataArr.length !==0 ? (<div>
        <div className='mt-5 text-2xl'>Results</div>
        <div className='border border-black mt-1 w-screen text-center text-black p-4 flex flex-wrap justify-center '>
          {summarizedDataArr.map((data,index) => (
            <div key={index} className='flex flex-col h-[350px] w-[300px] text-black bg-white rounded-lg shadow-lg overflow-scroll p-4 m-2'>
              <div className='text-center font-bold p-2'>Summary for {usernameArr[index]} </div>
              <div className='text-left p-2'>{data}</div>
            </div>))}
        </div>
      </div> ) : null }
    </div>

  )
}

export default Results