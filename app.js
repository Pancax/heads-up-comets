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


//user routes
app.post('/login',async function(req,res,next){
	let user = req.body.user;
	let pass = req.body.pass;

	let users = JSON.parse(fs.readFileSync("private/users.json"));

});




server.listen(3000,function(){
	console.log('listening on *:3000');
});







io.on('connection',function(socket){
	socket.on('login',function(receivedAuth){
		//recieved an Auth login
		console.log("login happened");
		console.log(receivedAuth+"");
		socket.on('disconnect',function(){
			//remove the Auth Login
			console.log("kill "+receivedAuth);
		})
	});
});
