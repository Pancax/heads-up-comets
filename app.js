//env
require('dotenv').config();

//imports
const createError = require('http-errors');
const http = require('http');
const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

//vars
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const e = require('express');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

//setup app
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'static/entry.html'));
});

authTokens = [];

//user routes
<<<<<<< Updated upstream
app.post('/login',async function(req,res,next){
	let user = req.body.user;
	let pass = req.body.pass;

	let users = JSON.parse(fs.readFileSync("private/users.json"));
	for(u of users){
		if(user == u.username){
			if(pass == u.password){
				let authString = Date.now();
				authTokens.push({"username":user,"auth":""+authString,"socket": null});
				console.log(user+" logged in.");
				res.status(200).send(""+authString);
				return;
			}
			else{
				res.status(400).send("Incorrect Password.");
				return;
			}
		}
	}
	res.status(400).send("Username not found.");
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
		res.status(200).send("User successfully created.");
	}else{
		res.status(400).send("Username already exists.");
	}
	fs.writeFileSync("private/users.json",JSON.stringify(users));

});


function user_for_auth(auth){
	for(at of authTokens){
		if(at.auth == auth){
			return at.username;
		}
	}
	return "";
}

function auth_for_user(user){
	for(at of authTokens){
		if(at.username == user){
			return at.auth;
		}
	}
	return "";
}




function add_event_count(event_id,weight){
	let events = JSON.parse(fs.readFileSync("private/events.json"));

	for(let e of events){
		if(e.id == event_id){
			e.count = e.count+weight;
			e.last_updated = Date.now();
		}
	}
	fs.writeFileSync("private/events.json",JSON.stringify(events));
}

//create_post, makes a post using content from params and adds it to a specific thread. Tracks the time
function create_new_post(thread_id,user,content,just_confirm){
	let threads = JSON.parse(fs.readFileSync("private/threads.json"));

	let thread = null;

	for(let t of threads){
		if(t.id == thread_id){
			thread=t;
			break;
		}
	}
	if(thread == null){
		return false;
	}

	let newPost = {
		"id": thread.posts.length,
		"owner": user,
		"content": content,
		"time_stamp": Date.now(),
	}
	thread.posts.push(newPost);
	add_event_count(thread.event_id, (just_confirm? 1 : 2))
	fs.writeFileSync("private/threads.json",JSON.stringify(threads));
	return true;
}

//make a new thread whenever you create an event, first post is that the user created the thread...
function make_new_thread(user, event_id){

	let threads = JSON.parse(fs.readFileSync("private/threads.json"));
	let new_thread = {
		"id": threads.length,
		"event_id": event_id,
		"posts": []
	}
	threads.push(new_thread);
	fs.writeFileSync("private/threads.json",JSON.stringify(threads));
	create_new_post(threads.length-1,user,user+" reported an ongoing event!",false);
=======
app.post('/login', async function (req, res, next) {
  let user = req.body.user;
  let pass = req.body.pass;

  let users = JSON.parse(fs.readFileSync('private/users.json'));
  for (u of users) {
    if (user == u.username) {
      if ((pass = u.password)) {
        let authString = Date.now();
        authTokens.push({ username: user, auth: '' + authString });
        console.log(user + ' logged in.');
        res.status(200).send('' + authString);
        return;
      }
    }
  }
  res.status(400).end();
});

app.post('/create_user', async function (req, res, next) {
  let user = req.body.user;
  let pass = req.body.pass;

  if (!user) {
    console.log('no user');
    res.status(400).end();
    return;
  } else if (!pass) {
    console.log('no pass');
    res.status(400).end();
    return;
  }

  let users = JSON.parse(fs.readFileSync('private/users.json'));
  same = 0;
  for (u of users) {
    if ((u.username = user)) {
      same = 1;
    }
  }

  if (same == 0) {
    users.push({ id: users.length, username: user, password: pass });
    res.status(200).end();
  } else {
    console.log('last');
    res.status(400).end();
  }
  fs.writeFileSync('private/users.json', JSON.stringify(users));
});

function user_for_auth(auth) {
  console.log('auth recieved: ' + auth);
  for (at of authTokens) {
    if (at.auth == auth) {
      return at.username;
    }
  }
  return '';
}

//make a new thread whenever you create an event, first post is that the user created the thread...
function make_new_thread(user) {
  let threads = JSON.parse(fs.readFileSync('private/threads.json'));

  let post = {
    id: 0,
    owner: user,
    content: user + ' just created a new event!',
  };

  let new_thread = {
    id: threads.length,
    posts: [post],
  };
  threads.push(new_thread);

  fs.writeFileSync('private/threads.json', JSON.stringify(threads));
>>>>>>> Stashed changes

  return threads.length - 1;
}

//event routes
<<<<<<< Updated upstream
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
		"thread_id": make_new_thread(user,events.length),
		"last_updated": Date.now()
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
				res.status(400).end();
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

=======
app.post('/create_event', function (req, res, next) {
  if (!req.body.auth || req.body.auth == '') {
    res.status(400).end();
    return;
  }

  let user = user_for_auth(req.body.auth);
  if (user == '') {
    res.status(400).end();
    return;
  }

  let events = JSON.parse(fs.readFileSync('private/events.json'));

  let newEvent = {
    id: events.length,
    owner: user,
    location: req.body.location,
    tags: req.body.tags,
    context: req.body.context,
    description: req.body.description,
    count: 1,
    thread_id: make_new_thread(user),
  };
  events.push(newEvent);
  fs.writeFileSync('private/events.json', JSON.stringify(events));
  res.status(200).end();
>>>>>>> Stashed changes
});

app.post('/edit_event', function (req, res, next) {
  let user = user_for_auth(req.body.auth);
  if (user == '') {
    res.status(400).end();
    return;
  }
  let events = JSON.parse(fs.readFileSync('private/events.json'));

  let index = 0;
  let c = 0;
  let oldEvent = null;
  for (let e of events) {
    if (e.id == req.body.event_id) {
      if (e.owner != user) {
        res.send(400).end();
        return;
      } else {
        index = c;
        oldEvent = e;
      }
    }
    c++;
  }

  events.splice(index, 1);

  let newEvent = {
    id: oldEvent.id,
    owner: oldEvent.owner,
    location: req.body.location,
    tags: req.body.tags,
    context: req.body.context,
    description: req.body.description,
    count: oldEvent.count,
    thread_id: oldEvent.thread_id,
  };
  events.push(newEvent);
  fs.writeFileSync('private/events.json', JSON.stringify(events));
  res.status(200).end();
});

<<<<<<< Updated upstream
app.get('/get_event',function(req,res,next){
	let events = JSON.parse(fs.readFileSync("private/events.json"));
	let threads = JSON.parse(fs.readFileSync("private/threads.json"));

	for(let e of events){
		if(e.id == req.query.event_id){

			let thread_and_event = {
				"id":e.id,
				"owner":e.owner,
				"location": e.location,
				"tags":e.tags,
				"context":e.context,
				"description":e.description,
				"count":e.count,
				"thread_id": e.thread_id,
				"thread": threads[e.thread_id] 
			};
			res.status(200).json(thread_and_event);
			return;
		}
	}
	res.status(404).json(JSON.parse("{}"));
});

app.get('/get_tags',function(req,res,next){
	let tags = fs.readFileSync("private/tags.json")
	res.status(200).json(tags);
});

//post endpoints
app.post('/create_post',function(req,res,next){
	let content = req.body;
	let user = user_for_auth(content.auth);
	if(user == "" || !content.auth || content.auth =="" ){
		res.status(400).end();
		return;
	}

	let sandy = create_new_post(content.thread_id,user,content.content,content.confirm);

	if(sandy){
		res.status(200).end();
	}else{
		res.status(400).end();
	}
});
=======
app.get('/get_events', function (req, res, next) {
  let events = JSON.parse(fs.readFileSync('private/events.json'));
  if (req.query.tags.length == 0) {
    res.status(200).json(events);
    return;
  }

  let addedE = [];
  for (let e of events) {
    for (tag of e.tags) {
      if (req.query.tags.includes(tag)) {
        addedE.push({
          id: e.id,
          owner: e.owner,
          location: e.location,
          tags: e.tags,
          context: e.context,
          count: e.count,
        });
        break;
      }
    }
  }

  res.status(200).json(addedE);
});

app.get('/get_event', function (req, res, next) {
  let events = JSON.parse(fs.readFileSync('private/events.json'));
>>>>>>> Stashed changes

  for (e of events) {
    if (e.id == req.query.event_id) {
      res.status(200).json(e);
      return;
    }
  }
  res.status(404).json(JSON.parse('{}'));
});

<<<<<<< Updated upstream
function alert_client(){
	io.emit("update");
}


function send_out_confirm_events(){
	let events = JSON.parse(fs.readFileSync("private/events.json"));
	io.emit("confirm_events",events);
}

function clean_map(){
	let events = JSON.parse(fs.readFileSync("private/events.json"));
	let threads = JSON.parse(fs.readFileSync("private/threads.json"));
	let time = Date.now() - (process.env.clean_map_interval-1000)*2;
	for(let i = 0; i < events.length; i++){
		let e = events[i];
		if(e.last_updated < time){
			e.count=Math.floor(e.count/2);
			if(e.count == 0){
				//lets kill this event object and the associated with it.
				console.log("Cleaned old event: " + e.id + " : "+ e.context);
				events.splice(i,1);
				for(let t_index =0; t_index < threads.length;t_index++){
					if(threads[t_index].event_id == e.id){
						threads.splice(t_index,1);
					}
					break;
				}
			}
		}
	}
	fs.writeFileSync("private/events.json",JSON.stringify(events));
	fs.writeFileSync("private/threads.json",JSON.stringify(threads));
	io.emit("update");
}

setInterval(alert_client,parseInt(process.env.client_alert_interval,10));
setInterval(send_out_confirm_events,parseInt(process.env.confirm_dialogue_interval,10));
setInterval(clean_map,parseInt(process.env.clean_map_interval,10));




io.on('connection',function(socket){
	socket.on('login',function(receivedAuth){
		
		//tell me who just connected
		for(let at of authTokens){
			if(at.auth == receivedAuth){
				console.log(at.username+" succesfully connected.");
				at.socket =socket;
			}
		}

		socket.on('disconnect',function(){
			//tell me who just disconnected and remove appropriate auth token
			for(let i = 0; i < authTokens.length; i++){
				if(authTokens[i].auth == receivedAuth){
					console.log(authTokens[i].username+" succesfully disconnected.");
					authTokens.splice(i,1);
				}
			}
		})
	});
=======
server.listen(3000, function () {
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  socket.on('login', function (receivedAuth) {
    //tell me who just connected
    for (at of authTokens) {
      if (at.auth == receivedAuth) {
        console.log(at.username + ' succesfully connected.');
      }
    }

    socket.on('disconnect', function () {
      //tell me who just disconnected and removed auth token
      for (let i = 0; i < authTokens.length; i++) {
        if (authTokens[i].auth == receivedAuth) {
          console.log(at.username + ' succesfully disconnected.');
          authTokens.splice(i, 1);
        }
      }
    });
  });
>>>>>>> Stashed changes
});
