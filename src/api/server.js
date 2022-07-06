const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const functions = require("./functions");
const connection = require("./connection");
const { createProxyMiddleware } = require("http-proxy-middleware");

const middleware = createProxyMiddleware({
  target: "http://localhost:3003",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/",
  },
});

app.use(middleware);
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

const server = app.listen(3003, "localhost", () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server listening on ${host}: ${port}`);
});

app.use(
  session({
    secret: functions.sessionkey,
    resave: false,
    saveUninitialized: true,
  })
);

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

app.get("/products", (req, res) => {
  if (!req.session.cartid) {
    let newid = Math.floor(Math.random() * 1000000);
    req.session.cartid = newid;
  }
  getProducts().then((data) => {
    res.json(data.rows);
  });
});

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

async function updateCart(quantity, cartid, productid) {
  const pool = new Pool(functions.credentials);
  let text;
  if (quantity > 0) {
    text = `
      UPDATE cart SET quantity = ${quantity} 
      WHERE cartid = ${cartid}
      AND productid = ${productid}
    `;
  } else {
    text = `
      DELETE FROM cart 
      WHERE cartid = ${cartid}
      AND productid = ${productid}
    `;
  }
  await pool.query(text);
  await pool.end();
}

app.put("/updatecart", (req, res) => {
  updateCart(req.body.quantity, req.session.cartid, req.body.productid);
  res.json("Successfully updated cart");
});

async function deleteCart(cartid) {
  const pool = new Pool(functions.credentials);
  const text = `DELETE FROM cart WHERE cartid = ${cartid}`;
  await pool.query(text);
  await pool.end();
}

app.delete("/deletecart", (req, res) => {
  deleteCart(req.session.cartid).then(() =>
    res.json("Successfully deleted cart")
  );
});
