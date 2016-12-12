'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });

var clients = []; 

//ovo dole znaci kada se klijent konektuje na server, onda server napravi novi kanal komunikacije ws//
wss.on('connection', function connection(ws) {
  clients.push(ws);

  ws.on('message', function incoming(message) {
  	clients.forEach(function(client) {
  		client.send(message);
  	});
	
	/*for(var i = 0; i < clients.length; i++) {
	  	clients[i].send(message);
	} */  
  });
});



app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, function(){
	console.log('app listening on port 8000');
});