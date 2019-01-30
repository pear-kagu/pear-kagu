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
    let groups = await meetup.getGroups({topic: topic}, async (err, resp) => {
      if (resp) {
        await Promise.all(
          resp.results.map(group => {
            const title = group.name
            const description = group.description
            const sourceUrl = group.link
            const imageUrl = group.group_photo
              ? group.group_photo.highres_link
              : 'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'

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
        )
        res.send(resp)
      } else return err
    })
    return groups
  } catch (err) {
    console.log(err)
  }
})
