const router = require('express').Router()
const {Content, Interest, User} = require('../db/models')

module.exports = router

router.get('/:typeId/:interestId', async (req, res, next) => {
  try {
    let typeId = Number(req.params.typeId)
    let interestId = Number(req.params.interestId)

    let content = await Content.findAll({
      where: {
        typeId,
        interestId
      }
    })

    res.status(200).send(content)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:userId', async (req, res, next) => {
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
