const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool, Client } = require("pg");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const server = app.listen(3003, "localhost", () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server listening on ${host} and ${port}`);
});

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "sticky-shoes",
  password: "qwerty10",
  port: 5432,
};

// async function getProducts() {
//   const pool = new Pool(credentials);
//   const text = `SELECT * FROM shoes`;
//   const now = await pool.query(text);
//   await pool.end();
//   return now;
// }

async function getProducts() {
  const pool = new Pool(credentials);
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
    res.json(data.rows).end();
  });
});
