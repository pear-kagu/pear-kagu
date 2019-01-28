/**
 * model name: content-type
 * usage: specifies type (media source: youtube, meetup etc) for the content. The type would be used to club and render content carousel on contents page for an interest
 */

// require modules
const Sequelize = require('sequelize')
const db = require('../db')

// define model
const ContentType = db.define('contentTypes', {
  type: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ContentType
