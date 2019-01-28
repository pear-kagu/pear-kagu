const Interest = require('./interest')
const Type = require('./type')
const User = require('./user')
const Content = require('./content')

Content.belongsToMany(User)
User.belongsToMany(Content)

Content.hasOne(Type)
Type.belongsToMany(Content)

module.exports = {
  User,
  Content,
  Interest,
  Type
}
