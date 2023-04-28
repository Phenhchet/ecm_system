const Customer = require('./customer.route.js');
const Address = require('./address.route.js')
const Cart = require('./cart.route.js')
const Category = require('./category.route.js')


const router = (app) => {
    app.use('/customers',Customer);
    app.use('/addresses',Address);
    app.use('/carts',Cart);
    app.use('/categories',Category);
}

module.exports = router