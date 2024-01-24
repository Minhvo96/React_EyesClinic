import React, { lazy, useState } from "react";
import customerService from "../services/customerService";

const Sidebar = lazy(() => import("../components/dashboard/Sidebar"));

const Header = lazy(() => import("../components/dashboard/Header"));

function DashboardLayout({ children }) {

    const [patientList, setPatientList] = useState([]);
 
    const searchPatient = async (e) => {
        if(e.target.value === ""){
            const response = await customerService.getAllCustomers();
            setPatientList(response);
        } else {
            const response = await customerService.searchCustomer(e.target.value);
            setPatientList(response);
        } 
    }
    
    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, { patientList: patientList });
      });

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
                    <Header search={searchPatient}/>
                    {childrenWithProps}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;