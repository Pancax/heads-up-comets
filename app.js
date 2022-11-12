//env
require('dotenv').config();

//imports
const createError = require('http-errors');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');

//vars
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//setup app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/',function(req,res){
	res.status(200).sendFile(path.join(__dirname,'static/entry.html'));
});


server.listen(3000,function(){
	console.log('listening on *:3000');
});
io.on('connection',function(socket){
	console.log('user connected');


	socket.on('disconnect',function(){
		console.log('A user disconnected');
	});

});
