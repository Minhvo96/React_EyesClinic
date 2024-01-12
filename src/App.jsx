import React, { Suspense, useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import PageServices from './components/services/PageServices';
import History from './components/history/History';
import WaitingList from './components/waitingList/WaitingList';
import Dashboard from './components/dashboard/Overview';
import Patient from './components/dashboard/Patient';
import Receptionist from './components/receptionist/Receptionist';
import WaitingPay from './components/receptionist/WaitingPay';
import BookingList from './components/receptionist/BookingList';
import WaitingPatients from './components/receptionist/WaitingPatients';
import Medicine from './components/dashboard/Medicine';
import Assistant from './components/assistant/Assistant';
import Login from './components/dashboard/Login';
import DashboardOverview from './pages/DashboardOverview';
import { AuthProvider } from './context/AuthProvider';
import { ClipLoader } from 'react-spinners';
import DashboardDoctor from './pages/DashboardDoctor';


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
                <Route path='' element={<BookingList />} />
                <Route path='waiting-list' element={<WaitingPatients />} />
                <Route path='waiting-pay' element={<WaitingPay />} />
              </Route>
              <Route path='/medicine' element={<Medicine />} />
              <Route path='/assistant/:bookingId' element={<Assistant roles={['ROLE_ASSISTANT']}/>} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App
