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
import {AccountSettingsContext} from './context/AccountSettings'



function App() {
  const { status} = useContext(AccountContext)

  return (
    <>
         {
          //if status is true display the dashboard
      status ? (
        <ContextProvider>
          <AccountSettingsContext>
          <Dashboard />
          </AccountSettingsContext>

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
