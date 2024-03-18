import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { signOut } from "firebase/auth";
import { clearSummaryData, setCreateUser } from '../utils/tweetsSlice';
import { LOGO } from '../utils/constant';

const Header = () => {

  const clickedStatus = useSelector(store => store.tweets.createUser);

  const [backToBody, setBackToBody] = useState(false);

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
      signOut(auth).then(() => {
          // Sign-out successful.
          console.log("signed out");
          dispatch(clearSummaryData());
      }).catch((error) => {
        // An error happened.
      });
  }

  const handleClick = () => {
    setBackToBody(!backToBody)
  }

  return (
    <div className='w-screen h-20 bg-cyan-200 flex justify-between items-center'>
        <div className='m-1'>
          <img className = "h-28" src = {LOGO} alt = "logo" />
        </div>
        <div className='flex cursor-pointer'>
          <div className='m-2 '>
              <Link to="/login" onClick={handleClick} className='m-2'>
                {user ? `Hi, ${user.displayName}` : (clickedStatus ? "Register" : "Sign In")}
              </Link>
              {backToBody && <Link to="/" className='m-2'>Home</Link>}
          </div>
        </div>
        
    </div>
  )
}

export default Header