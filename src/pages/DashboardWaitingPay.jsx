import React, { lazy } from "react";



const WaitingPay = lazy(() => import('../components/receptionist/WaitingPay'))
const StyleDashboard = lazy(() => import('../layouts/StyleDashboard'))
function DashboardWaitingPay() {
    return (
        <StyleDashboard children={<WaitingPay/>}/>       
    )
}

export default DashboardWaitingPay;