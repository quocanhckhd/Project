'use strict'
const config = require('../config/db.config');	
const Post = config.sequelize.define('posts', {
	  id: {
	  	type: config.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
	  },
	  title: {
	  	type: config.Sequelize.STRING
	  },
	  content: {
	  	type: config.Sequelize.STRING
	  },
	  link: {
	  	type: config.Sequelize.STRING
	  }
	}, {freezeTableName: true});
const Comment = config.sequelize.define('comments', {
	commentId: {
		type: config.Sequelize.INTEGER
	},
	name: {
		type: config.Sequelize.STRING
	},
	value: {
		type: config.Sequelize.STRING
	}
}, {freezeTableName: true});

const User = config.sequelize.define('users', {
	userId: {
		type: config.Sequelize.INTEGER
	},
	userName: {
		type: config.Sequelize.STRING
	},
	userPass: {
		type: config.Sequelize.STRING
	}
}, {freezeTableName: true});

//Connect Comment to Post
Comment.belongsTo(Post, { foreignKey: 'commentId', targetKey: 'id' });

//Connect User to Post
User.belongsTo(Post, { foreignKey: 'userId', targetKey: 'id'});


Post.sync();
Comment.sync();	
User.sync();

module.exports =
{
    Post: Post,
    Comment: Comment,
    User: User
};