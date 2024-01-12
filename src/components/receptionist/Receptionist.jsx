import React from 'react'
import Sidebar from '../dashboard/Sidebar'
import Header from '../dashboard/Header'
import { Outlet } from 'react-router-dom'
import addStyleDashboard from "../../AddStyleDashboard";

export default function Receptionist() {

  return (
    <div >
      <Outlet />
    </div>
  )
}
