var express = require('express');
const path = require('path');
var app = express();
const PORT = process.env.PORT || 8080;

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



// start the server
app.listen(PORT);
console.log('Express Server running at port:'.PORT);