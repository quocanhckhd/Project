 'use strict'
const config = require('../config/db.config');	

const User = config.sequelize.define('users', {
	id: {
	  	type: config.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
	},
	userName: {
		type: config.Sequelize.STRING
	},
	userPass: {
		type: config.Sequelize.STRING
	}
}, {freezeTableName: true});

const Cart = config.sequelize.define('carts', {
	   id: {
	  	type: config.Sequelize.INTEGER,
        autoIncrement: true,
         primaryKey: true,
	   },
	  userId: {
	  	type: config.Sequelize.INTEGER
	  },
	  itemId: {
	  	type: config.Sequelize.INTEGER
	  },
	  name: {
	  	type: config.Sequelize.STRING
	  },
	  price: {
	  	type: config.Sequelize.STRING
	  },
	  amount: {
	  	type: config.Sequelize.INTEGER
	  }
	}, {freezeTableName: true});

const Product = config.sequelize.define('products', {
	  id: {
	  	type: config.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
	  },
	  userId: {
	  	type: config.Sequelize.INTEGER
	  },
	  itemId: {
	  	type: config.Sequelize.INTEGER
	  },
	  name: {
	  	type: config.Sequelize.STRING
	  },
	  price: {
	  	type: config.Sequelize.STRING
	  },
	  amount: {
	  	type: config.Sequelize.INTEGER
	  },
	  selled: {
	  	type: config.Sequelize.INTEGER
	  }
	}, {freezeTableName: true});

const Bill = config.sequelize.define('bills', {
	  id: {
	  	type: config.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
	  },
	  userId: {
	  	type: config.Sequelize.INTEGER
	  },
	  itemId: {
	  	type: config.Sequelize.INTEGER
	  },
	  state: {
	  	type: config.Sequelize.STRING
	  },
	  name: {
	  	type: config.Sequelize.STRING
	  },
	  price: {
	  	type: config.Sequelize.STRING
	  },
	  amount: {
	  	type: config.Sequelize.INTEGER
	  }
	}, {freezeTableName: true});



const Admin = config.sequelize.define('admin', {
	  id: {
	  	type: config.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
	  },
	  userId: {
	  	type: config.Sequelize.INTEGER
	  },
	  itemId: {
	  	type: config.Sequelize.INTEGER
	  },
	  state: {
	  	type: config.Sequelize.STRING
	  },
	  name: {
	  	type: config.Sequelize.STRING
	  },
	  price: {
	  	type: config.Sequelize.STRING
	  },
	  amount: {
	  	type: config.Sequelize.INTEGER
	  }
}, {freezeTableName: true});
const Comment = config.sequelize.define('comments', {
	id: {
	  	type: config.Sequelize.INTEGER,
        autoIncrement: true,
         primaryKey: true,
	   },
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


//Connect User to Post
Cart.belongsTo(User, { foreignKey: 'userId', targetKey: 'id'});

//Connect User to Bill
Bill.belongsTo(User, { foreignKey: 'userId', targetKey: 'id'});

//Connect User to Product
Product.belongsTo(User, { foreignKey: 'userId', targetKey: 'id'});

//Connect User to Admin
Admin.belongsTo(User, { foreignKey: 'userId', targetKey: 'id'});

//Connect Comment to Cart
Comment.belongsTo(Cart, { foreignKey: 'commentId', targetKey: 'id' });



User.sync();
Cart.sync();
Bill.sync();
Product.sync();
Admin.sync();
Comment.sync();	

module.exports =
{
    Cart: Cart,
    User: User,
    Bill: Bill,
    Product : Product,
    Admin : Admin,
    Comment: Comment,
};