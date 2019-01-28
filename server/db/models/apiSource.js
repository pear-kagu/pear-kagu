const Sequelize = require('sequelize')
const db = require('../db')

const Apisource = db.define('apiSource', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Apisource
