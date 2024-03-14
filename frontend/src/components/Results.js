import React from 'react'
import ResultCard from './ResultCard'

const Results = () => {
  return (
    <>
        <div className='mt-5 text-2xl'>Results</div>
        <div className='border border-black mt-1 w-screen text-center  text-black p-4 flex flex-wrap justify-center '>
            
            <ResultCard />
        </div>
    </>
  )
}

export default Results