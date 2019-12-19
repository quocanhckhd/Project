const model = require('../model/cart.model.js');
const Admin = model.Admin;

exports.create = (req, res) => {	
	// Thêm sản phẩm lên admin server
	Admin.create({  
		userId: req.body.userId,
      	itemId: req.body.itemId,
      	state: req.body.state,
	  	name : req.body.name,
	  	price : req.body.price,
	  	amount: req.body.amount
	}).then(product => {		
		//Trả về sản phẩm
		res.send(product);
	});
};
exports.findAll = (req, res) => {
	Admin.findAll().then(items => {
	  // Lấy tất cả thông tin sản phẩm ở admin server 
	  res.send(items);
	});
};

exports.update = (req, res) => {
	const itemId = req.params.itemId;
	Admin.update( { 
	  	state: 'Hàng đã bán'
	  }, 
					 { where: {itemId: req.params.itemId} }
				   ).then(products => {
					 res.send(products);
				   });
};

// exports.delete = (req, res) => {
// 	const itemId = req.params.itemId;
// 	Admin.destroy({
// 	  where: { itemId: req.params.itemId }
// 	}).then(() => {
// 	  res.status(200).send('deleted successfully a post with itemId = ' + itemId);
// 	});
// };