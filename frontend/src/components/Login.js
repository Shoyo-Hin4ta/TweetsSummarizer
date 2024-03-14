import React, { useRef, useState } from 'react'

const Login = () => {

    const email = useRef(null);
    const password = useRef(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //validating inputs
        console.log(email.current.value);
        console.log(password.current.value);
        
        
    }


  return (
    <div className='border border-violet-500 flex justify-center items-center mt-48'>
        <form className='bg-blue-500 opacity-80 rounded-lg shadow-lg  flex flex-col justify-center w-[350px] h-[400px] items-center border border-red-400'>
            <label className='text-white text-2xl mb-10'>Login</label>
            <input ref={email} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="text" placeholder = 'Enter Email' />
            <input ref={password} className= "m-2 p-2 shadow-lg rounded-lg w-[280px]" type="password" placeholder= 'Enter Password' />
            <button onClick={handleSubmit} className='bg-slate-200 m-2 px-4 py-2 shadow-lg rounded-lg'> Submit </button>
            <label className='text-white text-1xl mt-4'>{error}</label>
        </form>
    </div>
  )
}

export default Login