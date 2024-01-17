import React, { lazy, useEffect } from "react";

const Staff = lazy(() => import("../components/dashboard/Staff"));
const StyleDashboard = lazy(() => import("../layouts/StyleDashboard"));

function DashboardStaff() {
  return <StyleDashboard children={<Staff />} />;
  
}

export default DashboardStaff;
