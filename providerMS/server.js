const express = require("express");
const app = express();
const MsgQueue = require("./msgQueue");

app.post("/send-msg", (req, res) => {
  const data = req.payload || {
    message: "this is first message",
    type: "info",
  };
  MsgQueue.sendMessage(data);
  console.log(`A message ${JSON.stringify(data)} is sent to queue`);
  res.send("Message Sent");
});

app.listen(5000, () => {
  console.log("provider is running on port 5000");
});
