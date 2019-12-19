const model = require('../model/blog.model.js');
const User = model.User;

//Create a user
exports.createUser = (req, res) => {
	User.create({
	  userId: req.body.userId, 
	  userName : req.body.userName,
	  userPass: req.body.userPass
	}).then(user => {		
		// Send created customer to client
		res.send(user);
	});
};

//Change user password
exports.update = (req, res) => {
	const userName = req.body.userName;
	User.update( { 
		userPass: req.body.userPass
	  }, 
					 { where: {userName: req.body.userName} }
				   ).then(() => {
					 res.status(200).send("Ban da doi mat khau thanh cong.");
				   });
};

//Find All customer
exports.findAll = (req, res) => {
	const userName = req.body.userName;
	const userPass = req.body.userPass;
	User.findAll({ where: {userName: req.body.userName, userPass: req.body.userPass } }).then((user) => {
					res.send(user);
				   });
};
