// import fetch from 'node-fetch';

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());

const basket = [];

const addItemToBasket = (id, properties) => {
  itemIndex = basket.findIndex((e) => e.id == id);
  // console.log(basket[id]);
  if (itemIndex !== -1) {
    basket[itemIndex] = {
      ...basket[itemIndex],
      quantity: ++basket[itemIndex].quantity
    };
  } else {
    basket.push({ ...properties, id, quantity: 1 });
  }
};

app.post('/:id', (req, res) => {
  0;
  const result = fetch(
    `http://localhost:4000/product_id/${req.params.id}`
  ).then((response) => {
    return response.text();
  });
  result.then((txt) => {
    itemDetails = JSON.parse(txt);
    addItemToBasket(req.params.id, itemDetails);
    res.status(201).send(basket);
  });
});

app.get('/basket', (req, res) => {
  res.send(basket);
});

app.listen(4001, () => {
  console.log('listening on 4001');
});
