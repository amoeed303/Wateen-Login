const express = require("express");
var cors = require("cors");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//defining routes
app.post("/login", (req, res) => {
  if (req.body) {
    console.log(req.body); 
    if (req.body.userIP) {
      if (req.body.username) {
        if (req.body.password) {
          res.status(200).json({ message: "Login successful" });
  //         const userName=req.body.username.includes("@wateen.net")?req.body.username:`${req.body.username}@wateen.net`;
  //         const hexUserName = Buffer.from(userName, "utf8").toString("hex");
  //         const bashCommand = `echo "Framed-IP-Address='${req.body.userIP}',Huawei-Command-Mode='0x01${hexUserName}',Huawei-User-Password='${req.body.password}'" |radclient -x 58.27.191.25:3799 coa brassecret`;
  //         exec(bashCommand, (error, stdout, stderr) => {
  //           if (error) {
  //             console.error(`Error executing command: ${error.message}`);
  //             return res.status(500).json({ error: "Internal server error" });
  //           }
  //           if (stderr) {
  //             console.error(`stderr: ${stderr}`);
  //           }
  //           //printing the executed ccommand output in desired output
  //           if (stdout.includes("Received CoA-ACK")) {
  //             const lines = stdout.split("\n");
  //             let userName,
  //               framedIPAddress,
  //               acctSessionId,
  //               nasIdentifier,
  //               nasPortId,
  //               idleTimeout,
  //               huaweiCommandMode;

  //             lines.forEach((line) => {
  //               if (line.includes("User-Name")) {
  //                 userName = line.split("=")[1].trim();
  //               } else if (line.includes("Framed-IP-Address")) {
  //                 framedIPAddress = line.split("=")[1].trim();
  //               } else if (line.includes("Acct-Session-Id")) {
  //                 acctSessionId = line.split("=")[1].trim();
  //               } else if (line.includes("NAS-Identifier")) {
  //                 nasIdentifier = line.split("=")[1].trim();
  //               } else if (line.includes("NAS-Port-Id")) {
  //                 nasPortId = line.split("=")[1].trim();
  //               } else if (line.includes("Idle-Timeout")) {
  //                 idleTimeout = line.split("=")[1].trim();
  //               } else if (line.includes("Huawei-Command-Mode")) {
  //                 huaweiCommandMode = line.split("=")[1].trim();
  //               }
  //             });

  //             // Constructing the message for CoA-ACK
  //             const message = `
  //   Received CoA-ACK:
  //     User-Name: ${userName}
  //     Framed-IP-Address: ${framedIPAddress}
  //     Acct-Session-Id: ${acctSessionId}
  //     NAS-Identifier: ${nasIdentifier}
  //     NAS-Port-Id: ${nasPortId}
  //     Idle-Timeout: ${idleTimeout}
  //     Huawei-Command-Mode: ${huaweiCommandMode}
  // `;

  //             console.log(message); // Output the constructed message
  //           } else if (stdout.includes("Received CoA-NAK")) {
  //             const lines = stdout.split("\n");
  //             let userName,
  //               framedIPAddress,
  //               acctSessionId,
  //               nasIdentifier,
  //               nasPortId,
  //               delegatedIPv6Prefix,
  //               huaweiCommandMode,
  //               errorCause;

  //             lines.forEach((line) => {
  //               if (line.includes("User-Name")) {
  //                 userName = line.split("=")[1].trim();
  //               } else if (line.includes("Framed-IP-Address")) {
  //                 framedIPAddress = line.split("=")[1].trim();
  //               } else if (line.includes("Acct-Session-Id")) {
  //                 acctSessionId = line.split("=")[1].trim();
  //               } else if (line.includes("NAS-Identifier")) {
  //                 nasIdentifier = line.split("=")[1].trim();
  //               } else if (line.includes("NAS-Port-Id")) {
  //                 nasPortId = line.split("=")[1].trim();
  //               } else if (line.includes("Delegated-IPv6-Prefix")) {
  //                 delegatedIPv6Prefix = line.split("=")[1].trim();
  //               } else if (line.includes("Huawei-Command-Mode")) {
  //                 huaweiCommandMode = line.split("=")[1].trim();
  //               } else if (line.includes("Error-Cause")) {
  //                 errorCause = line.split("=")[1].trim();
  //               }
  //             });

  //             // Constructing the message for CoA-NAK
  //             const message = `
  //   Received CoA-NAK:
  //     User-Name: ${userName}
  //     Framed-IP-Address: ${framedIPAddress}
  //     Acct-Session-Id: ${acctSessionId}
  //     NAS-Identifier: ${nasIdentifier}
  //     NAS-Port-Id: ${nasPortId}
  //     Delegated-IPv6-Prefix: ${delegatedIPv6Prefix}
  //     Huawei-Command-Mode: ${huaweiCommandMode}
  //     Error-Cause: ${errorCause}
  // `;

  //             console.log(message); // Output the constructed message
  //           }
  //         });
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
