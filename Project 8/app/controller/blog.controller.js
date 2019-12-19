const model = require('../model/blog.model.js');
const Post = model.Post;
// Post a Customers
exports.create = (req, res) => {	
	// Save to MySQL database
	Post.create({  
	  title : req.body.title,
	  content : req.body.content,
	  link: req.body.link
	}).then(post => {		
		// Send created customer to client
		res.send(post);
	});
};
 
// FETCH all Customers
exports.findAll = (req, res) => {
	Post.findAll().then(posts => {
	  // Send all customers to Client
	  res.send(posts);
	});
};
 
// Find a Customer by Id
exports.findById = (req, res) => {	
	Post.findById(req.params.postId).then(post => {
		res.send(post);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	const id = req.params.postId;
	Post.update( { 
		title : req.body.title,
	  	content : req.body.content,
	  	link: req.body.link 
	  }, 
					 { where: {id: req.params.postId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a post with id = " + id);
				   });
};

 
// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.postId;
	Post.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a post with id = ' + id);
	});
};

//Post a comment with Id 

