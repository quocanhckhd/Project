const axios = require('axios');

module.exports = function(app) {
 
    const carts = require('../controller/cart.controller.js');
    const comments = require('../controller/comment.controller.js');
    const users = require('../controller/user.controller.js');
    const bills = require('../controller/bill.controller.js');
    const products = require('../controller/product.controller.js');
    const admin = require('../controller/admin.controller.js');
    // Create a new post
    app.post('/api/carts', carts.create);
 
    // Retrieve all post
    app.get('/api/carts', carts.findAll);

    app.put('/api/carts/:itemId', carts.update);

    app.delete('/api/carts/:itemId', carts.delete);
   
    //Post a comment with Id 
    app.post('/api/comments', comments.createComment);

    //// Retrieve all comment
    app.get('/api/comments', comments.findAll);

    //Sign up an user
    app.post('/api/users', users.createUser);

    //Change Password
    app.put('/api/users', users.update);

    //Sign in
    app.post('/api/users/signin', users.findAll);

    //Thêm hàng vào hóa đơn
    app.post('/api/bills', bills.create);

    //Hiển thị
    app.get('/api/bills', bills.findAll);

    //Xóa
    app.delete('/api/bills/:itemId', bills.delete);

    //Cập nhật trạng thái giao hàng
    app.put('/api/bills/:itemId', bills.update);

    //Đăng lên danh sách products 
    app.post('/api/products', products.create);

    //Lấy số lượng từng products
    app.get('/api/products', products.findAll);

    //Sửa số lượng product
    app.put('/api/products/:itemId', products.update);

    //Admin post product
    app.post('/api/admin', admin.create);

    //get product from admin

    app.get('/api/admin', admin.findAll);

    //Update state for products on admin
    app.put('/api/admin/:itemId', admin.update);
}
