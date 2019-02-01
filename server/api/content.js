const router = require('express').Router()
const {Content, Interest} = require('../db/models')

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
