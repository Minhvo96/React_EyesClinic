import React, { lazy } from "react";

const Doctor = lazy(() => import('../doctorComponents/Doctor'))
const StyleDashboard = lazy(() => import('../layouts/StyleDashboard'))
function DashboardDoctor() {
    return (
        <StyleDashboard children={<Doctor/>}/>       
    )
}

export default DashboardDoctor;