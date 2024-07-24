// Read environment variables
const { config } = require("dotenv");
config();

const configurations = {
  PORT: process.env.PORT || 4000,
};

module.exports = configurations;