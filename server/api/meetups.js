const router = require('express').Router()
const meetupApiKey = process.env.MEETUPAPI_KEY
const {Content} = require('../db/models')
module.exports = router

// set type and api source id
const TYPE_ID = 3
const API_SOURCE_ID = 2

const meetup = require('meetup-api')({key: meetupApiKey})

router.get('/:topic', async (req, res, next) => {
  try {
    let topic = req.params.topic
    let groups = await meetup.getGroups({topic: topic}, (err, resp) => {
      if (resp) {
        resp.results.map(group => {
          let title = group.name
          let imageUrl
          let description = group.description
          let sourceUrl = group.link

          if (group.group_photo) {
            imageUrl = group.group_photo.highres_link
          } else {
            imageUrl =
              'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
          }

          Content.findOrCreate({
            where: {
              title,
              imageUrl,
              description,
              sourceUrl,
              typeId: TYPE_ID,
              apiSourceId: API_SOURCE_ID
            }
          })
        })
        res.send(resp)
      } else return err
    })
    return groups
  } catch (err) {
    console.log(err)
  }
})
