const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
// Set static path
app.use(express.static(path.join(__dirname, "client")));

// Create the VAPID keys
// web-push generate-vapid-keys [--json]
// ./node_modules/.bin/web-push generate-vapid-keys

// Public Key:
// BFpf9dMODw5sG5_B4Yb5F3P17sNatS04yMj63mpwqyWsSnHpwSP0eZ1iWG1NqWdEVpE4DZD3nuJU9fDRWbsVta4

// Private Key:
// h0LtNiTqH7vDpeKiLBhzxBafovTF0uX-IrGyI3Ed03Q

const publicVapidKey =
  "BFpf9dMODw5sG5_B4Yb5F3P17sNatS04yMj63mpwqyWsSnHpwSP0eZ1iWG1NqWdEVpE4DZD3nuJU9fDRWbsVta4";
const privateVapidKey = "h0LtNiTqH7vDpeKiLBhzxBafovTF0uX-IrGyI3Ed03Q";

webPush.setVapidDetails(
  "mailto:lucasmallmann76@gmail.com",
  publicVapidKey,
  privateVapidKey
);

app.use(express.json());

// Create the subscribe route which will send the notification
app.post("/subscribe", (req, res) => {
  // Get the push subscription object that we'll send from the client
  const subscription = req.body;

  // Send back the 201 status to indicate tha resource was created successfull
  res.status(201).json({});

  // Create Payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass the object into the send notification function
  webPush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 3333;

app.listen(port, () => console.log(`Server started on port ${port}`));
