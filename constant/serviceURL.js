const networkProtocol = "http";

const serviceURL = {
  // USER_SERVICE: `${networkProtocol}://user-service:8080`,
  USER_SERVICE: `${networkProtocol}://localhost:8080`,
  PROVIDER_SERVICE: `${networkProtocol}://localhost:5000`,
};

module.exports = serviceURL;