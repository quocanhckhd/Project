const model = require('../model/cart.model.js');
const Bill = model.Bill;

exports.create = (req, res) => {	
	// Save to MySQL database
	Bill.create({  
		  userId: req.body.userId,
      itemId: req.body.itemId,
      state: 'Đã đặt hàng',
	  name : req.body.name,
	  price : req.body.price,
	  amount: req.body.amount
	}).then(bills => {		
		// Send created customer to client
		res.send(bills);
	});
};
exports.findAll = (req, res) => {
	Bill.findAll().then(items => {
	  // Send all customers to Client
	  res.send(items);
	});
};

exports.update = (req, res) => {
	const itemId = req.params.itemId;
	Bill.update( { 
	  	state: 'Đang giao hàng' 
	  }, 
					 { where: {itemId: req.params.itemId} }
				   ).then(bills => {
					 res.send(bills);
				   });
};

exports.delete = (req, res) => {
	const itemId = req.params.itemId;
	Bill.destroy({
	  where: { itemId: req.params.itemId }
	}).then(() => {
	  res.status(200).send('deleted successfully a post with itemId = ' + itemId);
	});
};