const { prototype } = require("jsonwebtoken/lib/JsonWebTokenError");

const config = {
  user: "trade24x7_user", // Database username
  password: "Trd24*7aI", // Database password
  server: "103.71.99.105", // Server IP address
  database: "trade24x7", // Database name
  options: {
    encrypt: false, // Disable encryption
  },
  port: 1533,
};

module.exports = config;
