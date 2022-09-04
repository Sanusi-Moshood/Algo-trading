import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import { useStateContext } from '../context/ContextProvider'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import '../index.css'


const HomePage = () => {

  const {activeMenu} = useStateContext()

  return (
    <BrowserRouter>
      <div className="container">
        <div className="sidebar">

        </div>
        <div className="main_page">
          <div className="nav">
            <Navbar />
          </div>

          <Routes>
            <Route path='/' element='DASHBOARD' />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default HomePage
