const router = require('express').Router()
const {User, Content, Interest, UserContent} = require('../db/models')
module.exports = router

router.get('/:userId/interests', async (req, res, next) => {
  try {
    let userId = Number(req.params.userId)
    let savedContent = await UserContent.findAll({
      where: {
        userId
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

router.get('/:userId/content', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId)
    const [user] = await User.findAll({
      where: {
        id: userId
      },
      include: [
        {
          model: Content,
          attributes: [
            'title',
            'sourceUrl',
            'imageUrl',
            'description',
            'interestId',
            'typeId'
          ]
        }
      ]
    })

    res.status(200).send(user)
  } catch (err) {
    console.error(err)
  }
})

router.post('/:userId/content', async (req, res, next) => {
  try {
    const contentId = Number(req.body.contentId)
    const userId = Number(req.params.userId)
    await UserContent.findOrCreate({
      where: {
        userId: userId,
        contentId: contentId
      }
    })
    res.status(200).send('Content saved')
  } catch (err) {
    console.error(err)
  }
})
