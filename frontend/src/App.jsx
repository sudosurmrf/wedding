import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginAndReg from './components/LoginAndReg';
import { useAuth } from './context/AuthProvider';
import Home from './components/Home';
import Rsvp from './components/Rsvp';
const App = () => {
const {name} = useAuth();
  return (
    <>
      <Navbar />
    {name ? <h1>Hello {name}</h1> : <></>
    }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginAndReg />} />
        <Route path='/rsvp' element={<Rsvp />} />
      </Routes>
    </>
  )
}

export default App
