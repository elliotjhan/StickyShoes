const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const functions = require("./functions");

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
    select shoes.productid, shoes.name, shoes.description, shoes.price, shoes.image,
    array_agg(images.image) as carousel
    from shoes, images
    where shoes.productid = images.productid
    group by shoes.productid
  `;
  const now = await pool.query(text);
  await pool.end();
  return now;
}

app.get("/products", (req, res) => {
  getProducts().then((data) => {
    res.send(data.rows);
  });
});

app.use(
  session({
    secret: "shhhh",
    resave: true,
    saveUninitialized: false,
  })
);
