import React, { useRef, useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearSummaryData, hideShowResults } from '../utils/tweetsSlice';
import axios from 'axios';

const Login = () => {

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [createClicked, setCreateClicked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //validating inputs
        console.log(email.current.value);
        console.log(password.current.value);

        if(createClicked){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                console.log(user)
                updateProfile(user, {
                    displayName: name.current.value,
                  }).then(() => {
                    // Profile updated!
                    const {uid, email, displayName} = auth.currentUser;
                    
                    //make a call to update the database to update the email of the user.

                    dispatch(addUser({uid, email, displayName}));
                    dispatch(clearSummaryData());
                    dispatch(hideShowResults());
                    axios.post('/user', {
                        firstName: 'Fred',
                        lastName: 'Flintstone'
                      })
                      .then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    navigate("/")
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
                  
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        }else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const {uid, email, displayName} = auth.currentUser;
                    
                //make a call to update the database to update the email of the user.

                dispatch(addUser({uid, email, displayName}));

                navigate("/");
                dispatch(clearSummaryData());
                dispatch(hideShowResults());


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }


        

    }

    const handleCreate= () => {
        setCreateClicked(!createClicked);
    }


  return (
    <div className='border border-violet-500 flex justify-center items-center mt-48'>
        <form className='bg-blue-500 opacity-80 rounded-lg shadow-lg  flex flex-col justify-center w-[350px] h-[400px] items-center border border-red-400'>
            <label className='text-white text-2xl mb-10'>{createClicked ? "SignUp" : "Login"}</label>
            {createClicked && <input ref={name} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="text" placeholder = 'Enter Name' />}
            <input ref={email} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="text" placeholder = 'Enter Email' />
            <input ref={password} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="password" placeholder= 'Enter Password' />
            <button onClick={handleSubmit} className='bg-slate-200 m-2 px-4 py-2 shadow-lg rounded-lg w-[280px]'> {createClicked ? "Create Account" : "Submit"} </button>
            <label onClick={handleCreate} className='text-sm text-white font-semibold cursor-pointer'> Don't have an account? Create </label>
            <label className='text-white text-1xl mt-4'>{error}</label>
        </form>
    </div>
  )
}

export default Login