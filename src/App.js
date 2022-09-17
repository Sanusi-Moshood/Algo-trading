import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Account/Login'
import Register from './pages/Account/Register';
import Forgotpass from './pages/Account/Forgotpass';
import './index.css'
import Dashboard from './pages/Dashboard'
import { AccountContext } from './context/Account';
import { useContext, useState, useEffect } from 'react';
import { ContextProvider } from './context/ContextProvider';
import PageNotFound from './pages/PageNotFound';



function App() {
  //importing the user status from accountContext
  const {getSession} = useContext(AccountContext)

  const [status, setStatus] = useState(true);

  //using useEffect to set the status to true when login is successful
  useEffect(() => {
    getSession()
      .then(session => {
        console.log('Session: ', session);
        setStatus(true);
      
      })
      .catch((err) => {
        console.log('Session: ', err);
        setStatus(true);
      });
  }, [status])
  return (
    <>
         {
          //if status is true display the dashboard
      status ? (
        <ContextProvider>
        <Dashboard />
        </ContextProvider>
      ) : //else display the login and signup page

      (
        <BrowserRouter>
        <Routes>
          <Route path='/register'  element={<Register />}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/forgot_password'  element={<Forgotpass />}/>      
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
        </BrowserRouter>
      )
    }
    </>
  );
}

export default App;
