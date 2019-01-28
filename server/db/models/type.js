/**
 * model name: types
 * usage: specifies type (media source: youtube, meetup etc) for the content. The type would be used to club and render content carousel on contents page for an interest
 */

// require modules
const Sequelize = require('sequelize')
const db = require('../db')

// define model
const Type = db.define('types', {
  type: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Type
