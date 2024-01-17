import SockJS from "sockjs-client";
import Swal from "sweetalert2";

function UsingWebSocket () {
    // const url = 'http://localhost:8080/ws';
    //     const socket = new SockJS(url);
    //     const stompClient = Stomp.over(socket);

    //     const onMessage = (message) => {
    //         console.log('Received message:', message.body);

    //         Swal.fire({
    //             position: 'center',
    //             icon: 'success',
    //             title: JSON.parse(message.body).content,
    //             showConfirmButton: false,
    //             timer: 3500
    //         })

    //     };

    //     stompClient.connect({}, () => {
    //         console.log("SOCKET Connected");

    //         stompClient.subscribe('/topic/publicChatRoom', onMessage);
    //     }, (error) => {
    //         console.error('WebSocket error:', error);
    //     });

    //     return () => {
    //         stompClient.disconnect();
    //     };
}

export default UsingWebSocket;