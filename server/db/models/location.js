const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  }
})

module.exports = Location
