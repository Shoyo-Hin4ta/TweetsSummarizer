import { Outlet, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Body from "./components/Body";
import Header from './components/Header';
import Login from './components/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './utils/firebase';

function App() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
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
