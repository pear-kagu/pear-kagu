const router = require('express').Router()
const {Interest} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const interests = await Interest.findAll({
      where: {
        primary: true
      }
    })
    res.status(200).send(interests)
  } catch (err) {
    next(err)
  }
})
