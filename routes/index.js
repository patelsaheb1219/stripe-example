const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')("Enter your stripe secret key here");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/payment', (req, res) => {
  const { product, token } = req.body;
  console.log("product", product);
  console.log("price", product.price);
  const idempontencyKey = uuidv4();

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      amount: product.price * 100,
      currency: 'usd',
      customer: customer.id,
      receipent_email: token.email,
      description: product.name,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.address_country
        }
      }
    }, {idempontencyKey})
  }).then(result => res.status(200).json(result))
  .catch(err => console.log(err))
});

module.exports = router;
