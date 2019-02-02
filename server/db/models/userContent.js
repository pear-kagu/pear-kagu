const Sequelize = require('sequelize')
const db = require('../db')

const UserContent = db.define('user-content')

module.exports = UserContent
