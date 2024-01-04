import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Register from './components/login_register/Register';
import Login from './components/login_register/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageServices from './components/services/PageServices';
import History from './components/history/History';
import WaitingList from './components/waitingList/WaitingList';
import Doctor from './doctorComponents/Doctor';
import Dashboard from './components/dashboard/Dashboard';
import Patient from './components/dashboard/Patient';
import Receptionist from './components/receptionist/Receptionist';
import WaitingPay from './components/receptionist/WaitingPay';
import BookingList from './components/receptionist/BookingList';
import WaitingPatients from './components/receptionist/WaitingPatients';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/services' element={<PageServices />} />
          <Route path='/history' element={<History />} />
          <Route path='/waitinglist' element={<WaitingList />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/patient' element={<Patient/>} />
          <Route path='/receptionist' element={<Receptionist/>}>
            <Route path='' element={<BookingList/>}/>
            <Route path='waiting-list' element={<WaitingPatients/>}/>
            <Route path='waiting-pay' element={<WaitingPay/>}/>
          </Route>
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
