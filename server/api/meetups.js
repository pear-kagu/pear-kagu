const router = require('express').Router()
const meetupApiKey = process.env.MEETUPAPI_KEY
const {Content} = require('../db/models')
module.exports = router

// set type and api source id
const TYPE_ID = 3
const API_SOURCE_ID = 2
const COUNTRY = 'US'
const CITY = 'New York'
const STATE = 'NY'

const meetup = require('meetup-api')({key: meetupApiKey})

router.get('/search/:interestName', async (req, res, next) => {
  try {
    const interestName = req.params.interestName
    let groups = await meetup.getGroups(
      {topic: interestName, country: COUNTRY, state: STATE, city: CITY},
      (err, resp) => {
        if (resp) {
          const result = resp.results.map(group => {
            const title = group.name
            const description = group.description
            const sourceUrl = group.link
            const imageUrl = group.group_photo
              ? group.group_photo.highres_link
              : 'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            return {
              title,
              description,
              sourceUrl,
              imageUrl,
              typeId: TYPE_ID,
              apiSourceId: API_SOURCE_ID
            }
          })
          res.send(result)
        } else return err
      }
    )
    return groups
  } catch (err) {
    console.error(err)
  }
})

router.get('/primary/:interestId/:interestName', async (req, res, next) => {
  try {
    let {interestId, interestName} = req.params
    interestName = interestName.split(' ').join('-')
    let groups = await meetup.getGroups(
      {
        category_id: 34,
        topic: interestName,
        country: COUNTRY,
        state: STATE,
        city: CITY
      },
      (err, resp) => {
        if (resp) {
          resp.results.map(async group => {
            const title = group.name
            const description = group.description
            const sourceUrl = group.link
            const imageUrl = group.group_photo
              ? group.group_photo.highres_link
              : 'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            try {
              await Content.findOrCreate({
                where: {
                  title,
                  imageUrl,
                  description,
                  sourceUrl,
                  typeId: TYPE_ID,
                  apiSourceId: API_SOURCE_ID,
                  interestId
                }
              })
            } catch (error) {
              console.log('Duplicated meetup not added')
            }
          })
          res.send(resp)
        } else return err
      }
    )
    return groups
  } catch (err) {
    console.log(err)
  }
})
