const router = require('express').Router()
const {User, Content, Interest, UserContent} = require('../db/models')
module.exports = router

//get saved content
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

//add saved content
router.post('/:userId/content', async (req, res, next) => {
  try {
    const contentId = Number(req.body.contentId)
    const userId = Number(req.params.userId)
    await UserContent.findOrCreate({
      where: {
        userId,
        contentId
      }
    })
    res.status(200).send('Content saved')
  } catch (err) {
    console.error(err)
  }
})

//delete saved content
router.delete('/:userId/content/:contentId', async (req, res, next) => {
  try {
    const contentId = Number(req.params.contentId)
    const userId = Number(req.params.userId)
    await UserContent.destroy({
      where: {
        userId,
        contentId
      }
    })
    res.status(204).send('Content deleted')
  } catch (err) {
    console.error(err)
  }
})
