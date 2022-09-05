import React from 'react'
import { useStateContext } from '../context/ContextProvider';
import { MdMenu } from 'react-icons/md';


const Navbar = () => {


const {activeMenu, toggleSidebar, screenSize} = useStateContext();


  return (
    <div>
      {
         screenSize <= 900 && !activeMenu &&
        <MdMenu onClick={toggleSidebar}/>
      }
      Navbar
    </div>
  )
}

export default Navbar
