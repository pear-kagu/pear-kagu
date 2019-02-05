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

// get selected interest details
router.get('/:name', async (req, res, next) => {
  try {
    console.log('params', req.params)
    const name = req.params.name
    console.log('name in api', name)
    const interest = await Interest.findOne({
      where: {
        name
      },
      attributes: ['id', 'name']
    })
    res.status(200).send(interest)
  } catch (err) {
    next(err)
  }
})
