const Sequelize = require('sequelize')
const db = require('../db')

const Content = db.define('content', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  sourceUrl: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  publishedAt: {
    type: Sequelize.STRING,
    validate: {
      isDate: true
    }
  }
})

module.exports = Content
