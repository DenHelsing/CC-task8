const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const products = [
  { id: 1, price: 465465, name: 'First' },
  { id: 2, price: 999999, name: 'Second' },
  { id: 3, price: 999999, name: 'Third' },
  { id: 4, price: 999999, name: 'Fourth' },
  { id: 5, price: 999999, name: 'Fifth' }
];

app.get('/product_id/:id', (req, res) => {
  res.send(products.find((e) => e.id == req.params.id));
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.listen(4000, () => {
  console.log('listening on 4000');
});
