const router = require('express').Router()
const {User, Content, Interest, UserContent} = require('../db/models')
module.exports = router

function removeDuplicates(allInterests) {
  let interests = []
  for (let i = 0; i < allInterests.length; i++) {
    let currElem = allInterests[i]
    if (!interests.includes(currElem)) {
      interests.push(currElem)
    }
  }
  return interests
}

router.get('/:userId/content', async (req, res, next) => {
  try {
    let userId = Number(req.params.userId)
    let [user] = await User.findAll({
      where: {
        id: userId
      },
      attributes: ['id'],
      include: [
        {
          model: Content,
          attributes: [
            'title',
            'sourceUrl',
            'imageUrl',
            'description',
            'typeId'
          ],
          include: [{model: Interest, attributes: ['id', 'name']}]
        }
      ]
    })

    res.status(200).send(user)
  } catch (err) {
    console.error(err)
  }
})

router.get('/:userId/interests', async (req, res, next) => {
  try {
    let userId = Number(req.params.userId)
    let [user] = await User.findAll({
      where: {
        id: userId
      },
      attributes: ['id'],
      include: [
        {
          model: Content,
          attributes: [
            'title',
            'sourceUrl',
            'imageUrl',
            'description',
            'typeId'
          ],
          include: [{model: Interest, attributes: ['id', 'name']}]
        }
      ]
    })
    const {contents} = user
    console.log(contents)
    const allInterests = contents.map(content => {
      return content.interest.name
    })
    console.log('allInterests in api route', allInterests)
    const interests = removeDuplicates(allInterests)
    res.status(200).send(interests)
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
