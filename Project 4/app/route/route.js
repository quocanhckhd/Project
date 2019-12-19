const axios = require('axios');

module.exports = function(app) {
 
    const craw = require('../controller/controller.js');
 
    // Create a new Customer
    app.post('/api/data', craw.create);
}