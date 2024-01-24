import React, { Suspense, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import PageServices from './components/services/PageServices';
import History from './components/history/History';
import Medicine from './components/dashboard/Medicine';
import Login from './components/dashboard/Login';
import DashboardOverview from './pages/DashboardOverview';
import { AuthProvider, useAuthContext } from './context/AuthProvider';
import { ClipLoader } from 'react-spinners';
import DashboardDoctor from './pages/DashboardDoctor';
import DashboardAssistant from './pages/DashboardAssistant';
import DashboardBookingList from './pages/DashboardBookingList';
import DashboardWaitingPatients from './pages/DashboardWaitingList';
import DashboardWaitingPay from './pages/DashboardWaitingPay';
import Page403 from './components/error/Page403';
import Page401 from './components/error/Page401';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import DashboardStaff from './pages/DashboardStaff';
import DashboardPatient from './pages/DashboardPatient';
import WaitingList from './components/waitingList/WaitingList';



function App() {
  
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<ClipLoader color='#2F89FC' loading cssOverride={{ position: "fixed", top: "50%", right: "50%" }} />}>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/services' element={<PageServices />} />
              <Route path='/dashboard/history' element={<History />} />
              <Route path='/dashboard/doctor/:bookingId' element={<DashboardDoctor />} />
              <Route path='/dashboard/patient' element={<DashboardPatient />} />
              <Route path='/dashboard/overview' element={<DashboardOverview />} roles={['ROLE_ADMIN']} />
              <Route path='/dashboard/booking-list' element={<DashboardBookingList />} />
              <Route path='/dashboard/waiting-pay' element={<DashboardWaitingPay />} />
              <Route path='/dashboard/waiting-list' element={<DashboardWaitingPatients />} />
              <Route path='/waiting-list' element={<WaitingList />} />
              <Route path='/dashboard/medicine' element={<Medicine />} />
              <Route path='/dashboard/staff' element={<DashboardStaff />} />
              <Route path='/dashboard/assistant/:bookingId' element={<DashboardAssistant />} />
              <Route path='/login' element={<Login />} />
              <Route path='/error-401' element={<Page401 />} />
              <Route path='/error-403' element={<Page403 />} />
            </Routes>
          </Suspense>
        </AuthProvider>

      </BrowserRouter >
      <ToastContainer />
    </>
  )
}

export default App
