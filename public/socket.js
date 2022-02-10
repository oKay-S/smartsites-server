// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function (event) {
});

socket.addEventListener('error', function (e){
   console.log(e);
});

// Listen for messages
socket.addEventListener('message', function (event) {
    let message = event.data;
    console.log('Connected ', event.data);
    let element = document.getElementById('feed')
    element.innerText = message
});