import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Header from '../dashboard/Header'
import BookingList from './BookingList'
import { Outlet } from 'react-router-dom'
import addStyleDashboard from "../../AddStyleDashboard";

export default function Receptionist() {

  console.log('Receptionist render');
  addStyleDashboard();

  return (
    <div className='page-wrapper'
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed">

      <Sidebar/>


      <div className="body-wrapper">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
