const router = require('express').Router()
const {meetupApiKey} = require('../../secrets')
module.exports = router

const meetup = require('meetup-api')({
  key: meetupApiKey
})

//Meetup categories
// router.get('/categories', async (req, res, next) => {
//   try {
//     const categories = await meetup.getCategories((err, resp) => {
//       res.status(200).json(resp) //techid = 34
//     })
//     return categories
//   } catch (err) {
//     next(err)
//   }
// })

//Meetup groups per category
router.get('/:topic', async (req, res, next) => {
  try {
    let topic = req.params.topic
    let groups = await meetup.getGroups({topic: topic, zip: 11221}, function(
      resp
    ) {
      res.status(200).json(resp)
    })
    return groups
  } catch (err) {
    console.log(err)
  }
})

//required parameters [can use category_id, and/or zip, country,city,state for parameters: https://github.com/jkutianski/meetup-api/wiki/API-Methods-List ]

module.exports = router
