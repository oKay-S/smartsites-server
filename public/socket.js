// Create WebSocket connection.
const socket = new WebSocket('wss://smartsites.kieransoutter.com/');
const message = [];
let chart = null;

// Connection opened
socket.addEventListener('open', function (event) {
});

socket.addEventListener('error', function (e){
   console.log(e);
});

// Listen for messages
socket.addEventListener('message', function (event) {
    if (chart !== null){
        chart.destroy();
        chart = null;
    }
    let message = JSON.parse(event.data);
    console.log('Connected ', event.data);
    let element = document.getElementById('feed');
    element.innerText = message.counts[message.counts.length-1];

    const ctx = document.getElementById('myChart').getContext('2d');

    chart = new Chart(ctx, {
        type: 'line',
        data: {

            labels: message.times,
            datasets: [{
                label: 'Number Of Devices Over Time',
                data: message.counts,
                backgroundColor: [
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)'
                ],
                fill: true,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    firstrun = false

});

