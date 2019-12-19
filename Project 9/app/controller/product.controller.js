const model = require('../model/cart.model.js');

const Product = model.Product;

exports.create = (req, res) => {	
	// Save to MySQL database
	Product.create({  
	  userId: req.body.userId,
      itemId: req.body.itemId,
	  name : req.body.name,
	  price : req.body.price,
	  amount: req.body.amount,
	  selled: req.body.selled
	}).then(products => {		
		// Send created customer to client
		res.send(products);
	});
};
 
// FETCH all Customers
exports.findAll = (req, res) => {
	Product.findAll().then(items => {
	  // Send all customers to Client
	  res.send(items);
	});
};

exports.update = (req, res) => {
	const itemId = req.params.itemId;
	Product.update( { 
	  	amount: req.body.amount,
	  	selled: req.body.selled
	  }, 
					 { where: {itemId: req.params.itemId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a post with itemId = " + itemId);
				   });
};


exports.delete = (req, res) => {
	const itemId = req.params.itemId;
	Product.destroy({
	  where: { itemId: req.params.itemId }
	}).then(() => {
	  res.status(200).send('deleted successfully a post with itemId = ' + itemId);
	});
};

