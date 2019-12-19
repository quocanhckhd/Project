const db = require('../config/db.config.js');
const Data = db.customers;
 
// Post a data
exports.create = (req, res) => {	
	// Save to MySQL database
	Data.create({  
	  title: req.body.title,
	  url: req.body.url,
	  content: req.body.content,
	  time: req.body.time
	}).then(data => {		
		// Send data posted to client
		res.send(data);
	});
};