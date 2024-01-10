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
import Medicine from './components/dashboard/Medicine';
import Assistant from './components/assistant/Assistant';
import WaitingListAssistant from './components/assistant/WaitingListAssistant';


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
          <Route path='/doctor/:bookingId' element={<Doctor />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/patient' element={<Patient />} />
          <Route path='/receptionist' element={<Receptionist />}>
            <Route path='' element={<BookingList />} />
            <Route path='waiting-list' element={<WaitingPatients />} />
            <Route path='waiting-pay' element={<WaitingPay />} />
          </Route>
          <Route path='/medicine' element={<Medicine />} />
          <Route path='/waiting-list-assistant' element={<WaitingListAssistant />} />
          <Route path='/assistant/:bookingId' element={<Assistant />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
