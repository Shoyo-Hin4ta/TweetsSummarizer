import { Outlet, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Body from "./components/Body";
import Header from './components/Header';
import Login from './components/Login';

function App() {

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
