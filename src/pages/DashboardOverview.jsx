import React, { lazy } from "react";
import StyleDashboard from "../layouts/StyleDashboard";

const Overview = lazy(() => import('../components/dashboard/Overview'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
function DashboardOverview() {
    return (
        <StyleDashboard children={<Overview/>}/>       
    )
}

export default DashboardOverview;