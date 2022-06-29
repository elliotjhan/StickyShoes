const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const functions = require("./functions");
const { request } = require("express");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const server = app.listen(3003, "localhost", () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server listening on ${host}: ${port}`);
});

async function getProducts() {
  const pool = new Pool(functions.credentials);
  const text = `
    SELECT shoes.productid, shoes.name, shoes.description, shoes.price, shoes.image,
    array_agg(images.image) AS carousel
    FROM shoes, images
    WHERE shoes.productid = images.productid
    GROUP BY shoes.productid
  `;
  const now = await pool.query(text);
  await pool.end();
  return now;
}

async function addCart(productid, quantity, price, cartid) {
  const pool = new Pool(functions.credentials);
  const text = `
    INSERT INTO cart (quantity, productid, price, cartid) 
    VALUES (${quantity}, ${productid}, ${price}, ${cartid})
    ON CONFLICT (cartid, productid) 
    DO UPDATE SET quantity = cart.quantity + ${quantity}
  `;
  await pool.query(text);
  await pool.end();
}

app.use(
  session({
    secret: functions.sessionkey,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/products", (req, res, next) => {
  if (!req.session.cartid) {
    let newid = Math.floor(Math.random() * 1000000);
    req.session.cartid = newid;
  }
  getProducts().then((data) => {
    res.json(data.rows);
  });
});

app.post("/addtocart", (req, res) => {
  addCart(
    req.body.productid,
    req.body.quantity,
    req.body.price,
    req.session.cartid
  );
  res.json("Successfully added to cart");
});

async function getCart(cartid) {
  const pool = new Pool(functions.credentials);
  const text = `
    SELECT * FROM cart 
    INNER JOIN shoes ON cart.productid = shoes.productid
    WHERE cartid = ${cartid}
  `;
  const now = await pool.query(text);
  await pool.end();
  return now;
}

app.get("/cart", (req, res) => {
  if (req.session.cartid) {
    getCart(req.session.cartid).then((data) => {
      res.json(data.rows);
    });
  } else {
    res.json([]);
  }
});
