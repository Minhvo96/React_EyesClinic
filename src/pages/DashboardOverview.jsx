import React, { lazy, useEffect } from "react";
import StyleDashboard from "../layouts/StyleDashboard";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Overview = lazy(() => import("../components/dashboard/Overview"));
function DashboardOverview() {
  
  return <StyleDashboard children={<Overview />} />;
  
}

export default DashboardOverview;
