import React, { lazy } from "react";
import StyleDashboard from "../layouts/StyleDashboard";
import WaitingPatients from "../components/receptionist/WaitingPatients";


const Overview = lazy(() => import('../components/dashboard/Overview'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
function DashboardWaitingPatients() {
    return (
        <StyleDashboard children={<WaitingPatients/>}/>       
    )
}

export default DashboardWaitingPatients;