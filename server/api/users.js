const router = require('express').Router()
const {User, Content, Interest} = require('../db/models')
module.exports = router

router.get('/:userId/content', async (req, res, next) => {
  try {
    let userId = Number(req.params.userId)
    let savedContent = await User.findAll({
      where: {
        id: userId
      },
      attributes: ['id'],
      include: [
        {
          model: Content,
          attributes: ['title', 'sourceUrl', 'imageUrl', 'description'],
          include: [{model: Interest, attributes: ['id', 'name']}]
        }
      ]
    })

    res.status(200).send(savedContent)
  } catch (err) {
    console.error(err)
  }
})
