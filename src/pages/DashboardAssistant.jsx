import React, { lazy } from "react";
import StyleDashboard from "../layouts/StyleDashboard";
import Assistant from "../components/assistant/Assistant";

const Overview = lazy(() => import('../components/dashboard/Overview'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
function DashboardAssistant() {
    return (
        <StyleDashboard children={<Assistant/>}/>       
    )
}

export default DashboardAssistant;