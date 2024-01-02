import React, { useEffect, useState } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
export default function SamplePage() {
  

  return (
    <>
      {/*  Body Wrapper */}
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        {/* Sidebar Start */}
        <Sidebar/>
        {/*  Sidebar End */}
        {/*  Main wrapper */}
        <div className="body-wrapper">
          {/*  Header Start */}
          <Header/>
          {/*  Header End */}
        </div>
      </div>
    </>

  )
}
