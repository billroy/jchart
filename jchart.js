// jchart.js
//
// Copyright 2017 by Bill Roy - MIT license - see LICENSE file
//

// parse command line arguments
var argv = require('yargs')
    .usage('Usage: $0 --port=[3000]')
    .default('port', 3000)
    .default('logfile', 'none')
    .argv;

console.log('jchart here! v0.1');
console.log(argv);

// initialize the express app
var express = require('express');
var app = express();
var http = require('http');
server = http.createServer(app);
var io;                         // socket.io handle

// configure json body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb'}));

// serve the static content
if (!argv.no_static) app.use('/', express.static(__dirname + '/public'));

// receive POST requests with new chart data
app.post('/xychart/', function(req, res) {
    emitChart(req.body, 'chart');     // send to connected clients
    return res.sendStatus(200);
});

app.post('/hairball/', function(req, res) {
    emitChart(req.body, 'hairball');     // send to connected clients
    return res.sendStatus(200);
});

// send a chart update to all connected sockets
function emitChart(chartData, chartType) {
    console.log('Emitting chart:', chartData, chartType);
    sockets.forEach(function(socket) {
        socket.emit(chartType, chartData);
    });

    if (argv.logfile && (argv.logfile != 'none')) {
        logToFile(new Date().toString() + ',' + chartData + '\n');
    }
}

// log a chart request to the log file
var fs = require('fs');
function logToFile(text) {
    if (argv.logfile && (argv.logfile != 'none')) {
        fs.appendFile(argv.logfile, text,
                     function(err) {
                        if (err) {
                            console.log('logging error:', argv.logfile, err);
                            argv.logfile = undefined;   // turn off logging on error
                        }
                    });
    }
}

// start the web server
var sockets = [];
var listener = server.listen(argv.port, function() {
    console.log('Server is listening at:', listener.address());

    // start up socket.io
    io = require('socket.io').listen(listener);

    io.sockets.on('connection', function(socket) {
        sockets.push(socket);

        console.log('client connected: socket count=', sockets.length);

        socket.on('pong', function(data) {
            console.log('*** Pong:', data);
        });

        socket.on('stop', function(data) {
            console.log('*** Stop:', data);
        });

        socket.on('disconnect', function(which) {
            console.log('disconnect:', which);
            var index = sockets.indexOf(socket);
            if (index >= 0) sockets.splice(index);
            console.log('Client disconnected: socket count=', sockets.length);
        });

        //socket.emit('ping', {time: new Date().getTime()});
    });

});
