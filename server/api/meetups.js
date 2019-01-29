const router = require('express').Router()
const meetupApiKey = process.env.MEETUPAPI_KEY
module.exports = router

const meetup = require('meetup-api')({
  key: meetupApiKey
})

router.get('/:topic', async (req, res, next) => {
  try {
    let topic = req.params.topic
    let groups = await meetup.getGroups({topic: topic, zip: 11221}, function(
      resp
    ) {
      res.json(resp)
    })
    return groups
  } catch (err) {
    console.log(err)
  }
})
