const Sequelize = require('sequelize')
const db = require('../db')

const Content = db.define('content', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      allowNull: false
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    validate: {
      isUrl: true,
      allowNull: false
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
      allowNull: false
    }
  },
  sourceUrl: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isUrl: true,
      notEmpty: true,
      allowNull: false
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
