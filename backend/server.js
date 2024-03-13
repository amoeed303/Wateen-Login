const express = require("express");
//const mysql = require("mysql");
var cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//create one db table with
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "----",//change all accordingly
//     database:"User"
// })
//getting data using post method
//defining routes
app.post("/login", (req, res) => {
  if (req.body) {
    console.log(req.body); // Log the entire request body
    res.sendStatus(200);
  } else {
    res.status(400).json({ message: "Invalid request body" });
  }
});
app.get("/", (req, res) => {
  res.json({ message: "Wateen" });
});
app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
});
