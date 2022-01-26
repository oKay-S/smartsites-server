var express = require('express');
const path = require('path');
var app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// set the port based on environment (more on environments later)
var port = PORT;
// send our index.html file to the user for the home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// start the server
app.listen(PORT);
console.log('Express Server running at port:'.PORT);