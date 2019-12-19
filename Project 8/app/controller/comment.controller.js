const model = require('../model/blog.model.js');
const Comment = model.Comment;

//Create a comment
exports.createComment = (req, res) => {
	Comment.create({
	  commentId : req.body.commentId, 
	  name : req.body.name,
	  value: req.body.value
	}).then(comment => {		
		// Send created customer to client
		res.send(comment);
	});
};

//Get all comments
exports.findAll = (req, res) => {
	const id = req.params.commentId;
	Comment.findAll({ where: {commentId: req.params.commentId} }).then(comments => {
	  // Send all customers to Client
	  res.send(comments);
	});
};