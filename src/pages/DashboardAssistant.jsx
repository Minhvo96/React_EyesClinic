import React, { lazy } from "react";

const Assistant = lazy(() => import('../components/assistant/Assistant'))
const StyleDashboard = lazy(() => import('../layouts/StyleDashboard'))
function DashboardAssistant() {
    return (
        <StyleDashboard children={<Assistant/>}/>       
    )
}

export default DashboardAssistant;