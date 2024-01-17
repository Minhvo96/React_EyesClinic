import React, { lazy, useEffect } from "react";
import StyleDashboard from "../layouts/StyleDashboard";


const Overview = lazy(() => import("../components/dashboard/Overview"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
function DashboardOverview({roles}) {
  return <StyleDashboard children={<Overview />} />;
}

export default DashboardOverview;
