const Sequelize = require('sequelize')
const db = require('../db')

const ApiSource = db.define('apiSource', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    route: {
      type: Sequelize.STRING
    }
  }
})

module.exports = ApiSource
