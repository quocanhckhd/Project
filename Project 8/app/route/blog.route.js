const axios = require('axios');

module.exports = function(app) {
 
    const posts = require('../controller/blog.controller.js');
    const comments = require('../controller/comment.controller.js');
    const users = require('../controller/user.controller.js')
    // Create a new post
    app.post('/api/posts', posts.create);
 
    // Retrieve all post
    app.get('/api/posts', posts.findAll);
 
    // Retrieve a single post by Id
    app.get('/api/posts/:postId', posts.findById);
 
    // Update a post with Id
    app.put('/api/posts/:postId', posts.update);

    //Delete a post with Id
    app.delete('/api/posts/:postId', posts.delete);

    //Post a comment with Id 
    app.post('/api/comments', comments.createComment);

    //// Retrieve all comment
    app.get('/api/comments/:commentId', comments.findAll);

    //Sign up an user
    app.post('/api/users', users.createUser);

    //Change Password
    app.put('/api/users', users.update);

    //Sign in
    app.post('/api/users/signin', users.findAll);
}
