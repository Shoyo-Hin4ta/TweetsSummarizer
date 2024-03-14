import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-screen h-20 bg-cyan-200 flex justify-between items-center'>
        <div className='m-2'>Title/ Logo</div>
        <div className='flex'>
            <div className='m-2'><Link to= "/login">Login</Link></div>
            <div className='m-2'>How's it done ?</div>
        </div>
        
    </div>
  )
}

export default Header