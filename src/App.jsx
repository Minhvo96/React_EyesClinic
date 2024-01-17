import React, { Suspense, useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import PageServices from './components/services/PageServices';
import History from './components/history/History';
import WaitingList from './components/waitingList/WaitingList';
import Patient from './components/dashboard/Patient';
import Receptionist from './components/receptionist/Receptionist';
import Medicine from './components/dashboard/Medicine';
import Assistant from './components/assistant/Assistant';
import Login from './components/dashboard/Login';
import DashboardOverview from './pages/DashboardOverview';
import { AuthProvider } from './context/AuthProvider';
import { ClipLoader } from 'react-spinners';
import DashboardDoctor from './pages/DashboardDoctor';
import DashboardAssistant from './pages/DashboardAssistant';
import DashboardBookingList from './pages/DashboardBookingList';
import DashboardWaitingPatients from './pages/DashboardWaitingList';
import DashboardWaitingPay from './pages/DashboardWaitingPay';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<ClipLoader color='#2F89FC' loading cssOverride={{ position: "fixed", top: "50%", right: "50%" }} />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/services' element={<PageServices />} />
              <Route path='/history' element={<History />} />
              <Route path='/waitinglist' element={<WaitingList />} />
              <Route path='/doctor/:bookingId' element={<DashboardDoctor/>} />
              <Route path='/patient' element={<Patient />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard/overview' element={<DashboardOverview />} roles={['ROLE_ADMIN']} />
              <Route path='/receptionist' element={<Receptionist />}>
                <Route path='booking-list' element={<DashboardBookingList />} />
              </Route>
              <Route path='/waiting-pay' element={<DashboardWaitingPay />} />
              <Route path='/waiting-list' element={<DashboardWaitingPatients />} />
              <Route path='/medicine' element={<Medicine />} />
              <Route path='/assistant/:bookingId' element={<DashboardAssistant />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter >
      <ToastContainer />
    </>
  )
}

export default App
