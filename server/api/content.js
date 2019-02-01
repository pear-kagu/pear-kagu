const router = require('express').Router()
const {Content, Interest} = require('../db/models')

module.exports = router

router.get('/:typeId/:interestName', async (req, res, next) => {
  try {
    let typeId = req.params.typeId
    let interestName = req.params.interestName
    let interestId = await Interest.findOne({
      where: {
        name: interestName
      },
      attributes: ['id']
    })

    console.log('interestIdd', interestId)
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
