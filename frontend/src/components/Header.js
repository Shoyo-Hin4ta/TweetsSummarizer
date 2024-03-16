import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { signOut } from "firebase/auth";
import { clearSummaryData } from '../utils/tweetsSlice';

const Header = () => {

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
  
  console.log(user);
  return (
    <div className='w-screen h-20 bg-cyan-200 flex justify-between items-center'>
        <div className='m-2'>Title/ Logo</div>
        <div className='flex'>
            <div className='m-2'><Link to= "/login">{user ? "Hi, " + user.displayName : "SignIn"}</Link></div>
            {user && <div className='m-2 cursor-pointer' onClick={handleSignOut} >SignOut</div>}
            <div className='m-2'>How's it done ?</div>
        </div>
        
    </div>
  )
}

export default Header