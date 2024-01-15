import React, { lazy } from "react";
import StyleDashboard from "../layouts/StyleDashboard";
import Doctor from "../doctorComponents/Doctor";

const Overview = lazy(() => import('../components/dashboard/Overview'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
function DashboardDoctor() {
    return (
        <StyleDashboard children={<Doctor/>}/>       
    )
}

export default DashboardDoctor;