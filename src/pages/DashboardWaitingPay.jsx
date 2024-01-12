import React, { lazy } from "react";
import StyleDashboard from "../layouts/StyleDashboard";
import WaitingPay from "../components/receptionist/WaitingPay";



const Overview = lazy(() => import('../components/dashboard/Overview'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
function DashboardWaitingPay() {
    return (
        <StyleDashboard children={<WaitingPay/>}/>       
    )
}

export default DashboardWaitingPay;