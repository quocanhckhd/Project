const model = require('../model/cart.model.js');
const Cart = model.Cart;
// Post a Cart
exports.create = (req, res) => {	
	// Save to MySQL database
	Cart.create({  
	  userId: req.body.userId,
      itemId: req.body.itemId,
	  name : req.body.name,
	  price : req.body.price,
	  amount: req.body.amount
	}).then(carts => {		
		// Send created customer to client
		res.send(carts);
	});
};
 
// FETCH all Customers
exports.findAll = (req, res) => {
	Cart.findAll().then(items => {
	  // Send all customers to Client
	  res.send(items);
	});
};

exports.update = (req, res) => {
	const itemId = req.params.itemId;
	Cart.update( { 
	  	amount: req.body.amount 
	  }, 
					 { where: {itemId: req.params.itemId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a post with itemId = " + itemId);
				   });
};


exports.delete = (req, res) => {
	const itemId = req.params.itemId;
	Cart.destroy({
	  where: { itemId: req.params.itemId }
	}).then(() => {
	  res.status(200).send('deleted successfully a post with itemId = ' + itemId);
	});
};

