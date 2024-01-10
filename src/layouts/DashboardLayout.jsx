import React, { lazy } from "react";

const Sidebar = lazy(() => import("../components/dashboard/Sidebar"));

const Header = lazy(() => import("../components/dashboard/Header"));

function DashboardLayout({ children }) {
    
    return (
        <>
            <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            >            
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;