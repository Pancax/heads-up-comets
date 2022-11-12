// env
require('dotenv').config();
// imports
const express = require('express');
const fs = require('fs');



// begin
const router = express.Router();

// Begin endpoints

router.get('/', async function(req,res,next){
	res.status(200).end();
});

// End endpoints

module.exports = router;
