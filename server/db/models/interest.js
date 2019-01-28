const Sequelize = require('sequelize')
const db = require('../db')

const Interest = db.define('interest', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  primary: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Interest
