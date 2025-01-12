require('dotenv').config()

const PROPS = () => ({
  PORT: process.env.PORT || '3000',
})

module.exports = PROPS
