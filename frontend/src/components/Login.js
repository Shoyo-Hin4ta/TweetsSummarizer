import React, { useRef, useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearSummaryData, setCreateUser } from '../utils/tweetsSlice';
import axios from 'axios';

const Login = () => {

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const clickedStatus = useSelector(store => store.tweets.createUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //validating inputs
        console.log(email.current.value);
        console.log(password.current.value);

        if(clickedStatus){
            setError(null);
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                ;(async() => {
                    try {
                        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/create_user/' + userCredential.user.email);
                        // console.log(response);
                        navigate("/");
                    } catch (error) {
                        console.log(error);
                    }
                })();
                const user = userCredential.user;
                // ...
                // console.log(user)
                
                updateProfile(user, {
                    displayName: name.current.value,
                  }).then(() => {
                    // Profile updated!
                    const {uid, email, displayName} = user;
                    
                    //make a call to update the database to update the email of the user.

                    dispatch(addUser({uid, email, displayName}));
                    dispatch(clearSummaryData());
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    setError(error);
                  });
                  
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setError(errorMessage);
            });
        }else{
            setError(null);
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const {uid, email, displayName} = user;
                    

                dispatch(addUser({uid, email, displayName}));
                dispatch(clearSummaryData());

                
                navigate("/");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            });
        }


        

    }

    const handleCreate= () => {
        dispatch(setCreateUser());
    }


  return (
    <div className='flex justify-center items-center mt-48'>
        <form className='bg-blue-500 opacity-80 rounded-lg shadow-lg  flex flex-col justify-center w-[350px] h-[400px] items-center'>
            <label className='text-white text-2xl mb-10'>{clickedStatus ? "SignUp" : "Login"}</label>
            {clickedStatus && <input ref={name} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="text" placeholder = 'Enter Name' />}
            <input ref={email} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="text" placeholder = 'Enter Email' />
            <input ref={password} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="password" placeholder= 'Enter Password' />
            <button onClick={handleSubmit} className='bg-slate-200 m-2 px-4 py-2 shadow-lg rounded-lg w-[280px]'> {clickedStatus ? "Create Account" : "Submit"} </button>
            <label onClick={handleCreate} className='mt-4 text-sm text-white font-semibold cursor-pointer'> {clickedStatus ? "Have an account! Login":"Don't have an account? Create"} </label>
            <label className='text-white text-1xl mt-4'>{error}</label>
        </form>
    </div>
  )
}

export default Login