import React, { lazy, useEffect } from "react";

const Overview = lazy(() => import("../components/dashboard/Overview"));
const StyleDashboard = lazy(() => import("../layouts/StyleDashboard"));

function DashboardOverview() {
  return <StyleDashboard children={<Overview />} />;
  
}

export default DashboardOverview;
