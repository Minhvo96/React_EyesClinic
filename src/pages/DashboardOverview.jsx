import React, { lazy, useEffect } from "react";
import StyleDashboard from "../layouts/StyleDashboard";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Overview = lazy(() => import("../components/dashboard/Overview"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
function DashboardOverview() {
  
  useEffect(() => {
    const url = 'http://localhost:8080/ws';
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);

    const onMessage = (message) => {
      console.log('Received message:', message.body);
      // Xử lý tin nhắn nhận được ở đây
    };

    stompClient.connect({}, () => {
      console.log("SOCKET Connected");

      stompClient.subscribe('/topic/publicChatRoom', onMessage);
    }, (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);
  
  return <StyleDashboard children={<Overview />} />;
}

export default DashboardOverview;
