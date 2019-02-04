const router = require('express').Router()
const {Content} = require('../db/models')

module.exports = router

router.get('/:interestId', async (req, res, next) => {
  try {
    let interestId = Number(req.params.interestId)

    let content = await Content.findAll({
      where: {
        interestId
      }
    })

    res.status(200).send(content)
  } catch (err) {
    console.error(err)
  }
})
