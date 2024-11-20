const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function DiscountedTotal(cartTotal) {
  return cartTotal - (cartTotal * discountPercentage) / 100;
}
function calculatedTax(cartTotal) {
  return (cartTotal * taxRate) / 100;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = cartTotal + newItemPrice;
  res.send(result.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let result;
  if (isMember === 'true') result = DiscountedTotal(cartTotal).toString();
  else result = cartTotal;

  res.send(result);
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculatedTax(cartTotal).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  let result;
  if (shippingMethod === 'standard') result = distance / 50;
  else result = distance / 100;

  res.send(result.toString());
});

app.get('/shipping-cost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = purchaseAmount * loyaltyRate;
  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
