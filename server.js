var express = require('express');
const path = require('path');
var app = express();
var expressWs = require('express-ws')(app);
const PORT = process.env.PORT || 8080;
var aWss = expressWs.getWss('/');

let string = "connected";

app.use(express.static(__dirname + '/public'));

// set the port based on environment (more on environments later)
var port = PORT;
// send our index.html file to the user for the home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, 'public' , 'about.html'));
});

app.get('/feed', function(req, res) {
    res.sendFile(path.join(__dirname, 'public' , 'feed.html'));
});

app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname, 'public' , 'contact.html'));
});

app.get('/review', function(req, res) {
    res.sendFile(path.join(__dirname, 'public' , 'review.html'));
});

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

let lastcount = ["0"];


function gettime(){
    let date = new Date();
    return date.getUTCHours() + ":" + date.getUTCMinutes();
}

let lasttime = [gettime()];


app.ws('/', function(ws, req) {
    lastcount.forEach(function (count){
        ws.send(JSON.stringify({times:lasttime, counts:lastcount}));
    });

    ws.on('message', function(msg) {
        if (msg.split(".")[0] == "bkjsafey834tw"){
            let string = msg.split(".")[1] || "0";
            try {
                if (string === parseInt(string).toString()) {
                    console.log("test")
                    lastcount.push(string);
                    lasttime.push(gettime())
                    if (lastcount.length > 10){
                        lastcount.shift()
                        lasttime.shift()
                    }
                    console.log({times:lasttime, counts:lastcount})
                    aWss.clients.forEach(function (client) {
                        client.send(JSON.stringify({times:lasttime, counts:lastcount}));
                    });
                }
            }
            catch (e)
            {
                console.log("inproper message: ",e)
            }
        }
    });
    console.log('socket', req.testing);
});

// start the server
app.listen(PORT);
console.log('Express Server running at port:'.PORT);