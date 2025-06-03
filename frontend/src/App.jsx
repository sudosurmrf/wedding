import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginAndReg from './components/LoginAndReg';
import { useAuth } from './context/AuthProvider';
import Home from './components/Home';
import Rsvp from './components/Rsvp';
import Info from './components/Info';
import OurMemories from './components/OurMemories';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/media' element={<OurMemories />} />
        <Route path='/login' element={<LoginAndReg />} />
        <Route path='/rsvp' element={<Rsvp />} />
        <Route path='/info' element={<Info />} />
      </Routes>
    </>
  )
}

export default App
