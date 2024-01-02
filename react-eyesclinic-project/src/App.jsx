import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Register from './components/login_register/Register';
import Login from './components/login_register/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageServices from './components/services/PageServices';
import UseEffectForRender from './UseEffect';
import History from './components/history/History';
import WaitingList from './components/waitingList/WaitingList';
import Doctor from './doctorComponents/Doctor';

function App() {

  useEffect(() => {
    UseEffectForRender()
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/services' element={<PageServices/>} />
          <Route path='/history' element={<History/>} />
          <Route path='/waitinglist' element={<WaitingList/>} />
          <Route path='/doctor' element={<Doctor/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
