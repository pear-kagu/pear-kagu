const Interest = require('./interest')
const Type = require('./type')
const User = require('./user')
const Content = require('./content')

Content.belongsToMany(User, {through: 'User-Content'})
User.belongsToMany(Content, {through: 'User-Content'})

Content.belongsTo(Type)
Type.hasMany(Content)

module.exports = {
  User,
  Content,
  Interest,
  Type
}
