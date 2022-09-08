import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Account/Login'
import Register from './pages/Account/Register';
import Register2 from './pages/Account/Register2';
import Forgotpass from './pages/Account/Forgotpass';
import './index.css'
import Dashboard from './pages/Dashboard'
import { AccountContext } from './context/Account';
import { useContext } from 'react';
import { ContextProvider } from './context/ContextProvider';



function App() {
  const { status } = useContext(AccountContext);
  return (
    <>
         {
      status ? (
        <ContextProvider>
        <Dashboard />
        </ContextProvider>
      ) : 
      (
        <BrowserRouter>
        <Routes>
          <Route path='/register'  element={<Register />}/>
          <Route path='/register2'  element={<Register2 />}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/forgot_password'  element={<Forgotpass />}/>      
        </Routes>
        </BrowserRouter>
      )
    }
    </>
  );
}

export default App;
