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
const e = require('express');
const io = new Server(server);

//setup app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//routes
app.get('/',function(req,res){
	res.status(200).sendFile(path.join(__dirname,'static/entry.html'));
});

authTokens = [];

//user routes
app.post('/login',async function(req,res,next){
	let user = req.body.user;
	let pass = req.body.pass;

	let users = JSON.parse(fs.readFileSync("private/users.json"));
	for(u of users){
		if(user == u.username){
			if(pass = u.password){
				let authString = Date.now();
				authTokens.push({"username":user,"auth":""+authString});
				console.log(user+" logged in.");
				res.status(200).send(""+authString);
				return;
			}
		}
	}
	res.status(400).end();
});

app.post('/create_user',async function(req,res,next){
	let user = req.body.user;
	let pass = req.body.pass;


	if(!user){
		res.status(400).end();
		return;
	}else if(!pass){
		res.status(400).end();
		return;
	}

	let users = JSON.parse(fs.readFileSync("private/users.json"));
	same=0;
	for(u of users){
		if(u.username = user){
			same=1;
		}
	}

	if(same == 0){
		users.push({"id":users.length,"username":user,"password":pass});
		res.status(200).end();
	}else{
		res.status(400).end();
	}
	fs.writeFileSync("private/users.json",JSON.stringify(users));

});


function user_for_auth(auth){
	console.log("auth recieved: "+ auth);
	for(at of authTokens){
		if(at.auth == auth){
			return at.username;
		}
	}
	return "";
}


//make a new thread whenever you create an event, first post is that the user created the thread...
function make_new_thread(user){

	let threads = JSON.parse(fs.readFileSync("private/threads.json"));

	let post = {
		"id": 0,
		"owner": user,
		"content": user+" just created a new event!"
	}

	let new_thread = {
		"id": threads.length,
		"posts": [post]
	}
	threads.push(new_thread);

	fs.writeFileSync("private/threads.json",JSON.stringify(threads));

	return threads.length-1;
}

//event routes
app.post('/create_event',function(req,res,next){

	if(!req.body.auth || req.body.auth == ""){
		res.status(400).end()
		return;
	}

	let user = user_for_auth(req.body.auth);
	if(user == ""){
		res.status(400).end();
		return;
	}

	let events = JSON.parse(fs.readFileSync("private/events.json"));

	
	let newEvent = {
		"id": events.length,
		"owner":user,
		"location": req.body.location,
		"tags": req.body.tags,
		"context": req.body.context,
		"description": req.body.description,
		"count": 1,
		"thread_id": make_new_thread(user)
	}
	events.push(newEvent);
	fs.writeFileSync("private/events.json",JSON.stringify(events));
	res.status(200).end();
});

app.post('/edit_event',function(req,res,next){

	let user = user_for_auth(req.body.auth);
	if(user == ""){
		res.status(400).end();
		return;
	}
	let events = JSON.parse(fs.readFileSync("private/events.json"));

	let index = 0;
	let c = 0; 
	let oldEvent = null;
	for(let e of events){
		if(e.id == req.body.event_id){
			if(e.owner != user){
				res.send(400).end();
				return;
			}
			else{
				index=c;
				oldEvent = e;
			}
		}
		c++;
	}

	events.splice(index,1);

	let newEvent = {
		"id": oldEvent.id,
		"owner": oldEvent.owner,
		"location": req.body.location,
		"tags": req.body.tags,
		"context": req.body.context,
		"description": req.body.description,
		"count": oldEvent.count,
		"thread_id": oldEvent.thread_id
	}
	events.push(newEvent);
	fs.writeFileSync("private/events.json",JSON.stringify(events));
	res.status(200).end();

});

app.get('/get_events',function(req,res,next){
	let events = JSON.parse(fs.readFileSync("private/events.json"));
	if(req.query.tags.length == 0){
		res.status(200).json(events);
		return;
	}

	let addedE = []
	for(let e of events){
		for(tag of e.tags){
			if(req.query.tags.includes(tag)){
				addedE.push({
					"id":e.id,
					"owner":e.owner,
					"location":e.location,
					"tags":e.tags,
					"context":e.context,
					"count":e.count
				});
				break;
			}
			
		}
	}

	res.status(200).json(addedE);

	

});

app.get('/get_event',function(req,res,next){
	let events = JSON.parse(fs.readFileSync("private/events.json"));
	
	for(e of events){
		if(e.id == req.query.event_id){
			res.status(200).json(e);
			return;
		}
	}
	res.status(404).json(JSON.parse("{}"));
});


server.listen(3000,function(){
	console.log('listening on *:3000');
});







io.on('connection',function(socket){
	socket.on('login',function(receivedAuth){
		
		//tell me who just connected
		for(at of authTokens){
			if(at.auth == receivedAuth){
				console.log(at.username+" succesfully connected.");
			}
		}

		socket.on('disconnect',function(){
			//tell me who just disconnected and removed auth token
			for(let i = 0; i < authTokens.length; i++){
				if(authTokens[i].auth == receivedAuth){
					console.log(at.username+" succesfully disconnected.");
					authTokens.splice(i,1);
				}
			}
		})
	});
});
