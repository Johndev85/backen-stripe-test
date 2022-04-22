const dotenv = require("dotenv").config()

module.exports = {
  UK_STRIPE: process.env.UK_STRIPE,
  PORT: process.env.PORT || 4242,
}
