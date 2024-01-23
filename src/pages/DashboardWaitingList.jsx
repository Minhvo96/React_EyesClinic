import React, { lazy } from "react";

const WaitingPatients = lazy(() => import('../components/receptionist/WaitingPatients'))
const StyleDashboard = lazy(() => import('../layouts/StyleDashboard'))
function DashboardWaitingPatients() {
    return (
        <StyleDashboard children={<WaitingPatients />}/>       
    )
}

export default DashboardWaitingPatients;