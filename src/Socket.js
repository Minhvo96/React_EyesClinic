import SockJS from "sockjs-client";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { Stomp } from '@stomp/stompjs';

function UsingWebSocket () {
    const url = 'http://localhost:8080/ws';
        const socket = new SockJS(url);
        const stompClient = Stomp.over(socket); 

        const onMessage = (message) => {
            console.log('Received message:', message.body);
            
            toast.success(JSON.parse(message.body).content, {
                position: toast.POSITION.TOP_RIGHT
            });
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
}

export default UsingWebSocket;