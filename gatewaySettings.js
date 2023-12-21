const rateLimit = require("express-rate-limit");
// cache middleware
const cache = require("http-cache-middleware")();

const requiredAuth = require("./middleware/requiredAuth");
const rateLimitConfig = require("./middleware/rateLimit");
const serviceURL = require("./constant/serviceURL");

const settings = {
  timeout: 3000,
  middleware: [require("cors"), rateLimit(rateLimitConfig), cache],
  routes: [
    {
      proxyType: "http", // http or lambda
      prefix: "/user",
      target: serviceURL.USER_SERVICE,
      methods: ["GET", "POST", "PUT"],
      middleware: [requiredAuth],
      hooks: {
        async onRequest(req, res) {
            console.log(req.url)
            req.name = 'rahul'
        },
        // onResponse(req, res) {
        //   console.log("res", res.message)
        //   res.send();
        // },
      },
    },
    {
      proxyType: "http", // http or lambda
      prefix: "/provider",
      target: serviceURL.PROVIDER_SERVICE,
      methods: ["GET", "POST", "PUT"],
      middleware: [],
      hooks: {},
    },
  ],
};

module.exports = settings;
