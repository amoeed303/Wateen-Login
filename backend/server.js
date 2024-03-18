const express = require("express");
//const mysql = require("mysql");
var cors = require("cors");
const { exec } = require("child_process");
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

//defining routes
app.post("/login", (req, res) => {
  if (req.body) {
    console.log(req.body); // Log the entire request body
    if (req.body.userIP) {
      //check for ip
      if (req.body.username) {
        //check for usernme
        if (req.body.password) {
          //check for password
          const userName = `${req.body.username}@wateen.net`;
          const hexUserName = Buffer.from(userName, "utf8").toString("hex");
          const bashCommand = `echo "Framed-IP-Address='${req.body.userIP}',Huawei-Command-Mode='0x01${hexUserName}',Huawei-User-Password='${req.body.password}'" |radclient -x 58.27.191.25:3799 coa brassecret`;
          exec(bashCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing command: ${error.message}`);
              return res.status(500).json({ error: "Internal server error" });
            }
            if (stderr) {
              console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            if (stdout.includes("Received CoA-ACK")) {
              return res.status(200).json({ success: "CoA-ACK received" });
            } else {
              return res.status(400).json({ error: "CoA-ACK not received" });
            }
          });
        } else {
          res.status(400).json({ message: "Invalid password" });
        }
      } else {
        res.status(400).json({ message: "Invalid username" });
      }
    } else {
      res.status(400).json({ message: "Invalid user IP" });
    }
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
