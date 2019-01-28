const User = require('./user')
const Content = require('./content')
const Interest = require('./interest')
const Type = require('./type')
const Location = require('./location')

Content.belongsToMany(User, {through: 'User-Content'})
User.belongsToMany(Content, {through: 'User-Content'})

Content.belongsTo(Type)
Type.hasMany(Content)

module.exports = {
  User,
  Content,
  Interest,
  Type,
  Location
}
