const dotenv = require('dotenv');
dotenv.config();

// console.log(process.env.PORT); // Check if PORT is being loaded correctly
// console.log(process.env.FLIGHT_SERVICE); // Check if FLIGHT_SERVICE is being loaded correctly

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE: process.env.FLIGHT_SERVICE
};
