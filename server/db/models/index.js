const Interest = require('./interest')
const Type = require('./type')
const User = require('./user')
const Content = require('./content')

Content.belongsToMany(User, {through: 'User-Content'})
User.belongsToMany(Content, {through: 'User-Content'})

Content.hasOne(Type)
Type.belongsToMany(Content)

module.exports = {
  User,
  Content,
  Interest,
  Type
}
