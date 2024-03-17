import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
import './index.css';
import Body from "./components/Body";
import Header from './components/Header';
import Login from './components/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebase';
import appStore from './utils/appStore';
import { Provider, useDispatch } from 'react-redux';
import { addUser, removeUser } from './utils/userSlice';
import { hideShowResults, clearSummaryData } from './utils/tweetsSlice';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }))

        // const  getUserData() {
        //   return axios.get('/user/12345');
        // }



        } else {
        // User is signed out
        dispatch(removeUser());
        dispatch(hideShowResults());
        dispatch(clearSummaryData());
        navigate("/");
      }
    });

    return () => unsubscribe();

  }, []);

  return (
      <div className='bg-cyan-100 h-screen'>
        <Header />
        <Outlet />
      </div>
    
  );

}


export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: '/',
        element : <Body/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  },

])

export default App;
