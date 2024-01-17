import React, { lazy } from "react";

const Patient = lazy(() => import('../components/dashboard/Patient'))
const StyleDashboard = lazy(() => import('../layouts/StyleDashboard'))
function DashboardPatient() {
    return (
        <StyleDashboard children={<Patient/>}/>       
    )
}

export default DashboardPatient;