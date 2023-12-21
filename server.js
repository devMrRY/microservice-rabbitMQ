const morgan = require("morgan");
const gateway = require("fast-gateway");
const gatewaySettings = require("./gatewaySettings");
const port = 3000;

const app = gateway(gatewaySettings);
app.use(morgan("combined"));

app.get("/server/health", (req, resp) => {
  return resp.send("Server is running");
});

app.start(port).then(() => {
  console.log(`server is listening at http://localhost:${port}`);
});
