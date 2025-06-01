import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginAndReg from './components/LoginAndReg';
import { useAuth } from './context/AuthProvider';
const App = () => {
const {name} = useAuth();
  return (
    <>
      <Navbar />
    {name ? <h1>Hello {name}</h1> : <></>
    }
      <Routes>
        <Route path='/login' element={<LoginAndReg />} />
      </Routes>
    </>
  )
}

export default App
