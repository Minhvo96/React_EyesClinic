import SockJS from "sockjs-client";
import "react-toastify/dist/ReactToastify.css";
import { Stomp } from "@stomp/stompjs";

function UsingWebSocket2(callback) {
  // const url = 'http://localhost:8080/ws';
  const url = `${import.meta.env.VITE_API_SOCKET_URL}`;
  const socket = new SockJS(url);
  const stompClient = Stomp.over(socket);

  const onMessage = (message) => {
    console.log("Received message:", JSON.parse(message.body).contents);
    callback(JSON.parse(message.body).contents);
  };

  stompClient.connect(
    {},
    () => {
      console.log("SOCKET Connected");

      stompClient.subscribe("/topic/publicContent", onMessage);
    },
    (error) => {
      console.error("WebSocket error:", error);
    }
  );

  return () => {
    stompClient.disconnect();
  };
}

export default UsingWebSocket2;
