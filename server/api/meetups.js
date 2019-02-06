const router = require('express').Router()
const meetupApiKey = process.env.MEETUPAPI_KEY
const {Content} = require('../db/models')
module.exports = router

// set type and api source id
const TYPE_ID = 3
const API_SOURCE_ID = 2
const CATEGORY_ID = 34 //Tech specific
const ZIPCODE = 10001 //NYC
const MAX_RADIUS = 25

const meetup = require('meetup-api')({key: meetupApiKey})

router.get('/search/:interestName', async (req, res, next) => {
  try {
    let interestName = req.params.interestName
    interestName = interestName.toLowerCase()
    let groups = await meetup.getGroups(
      {
        category_id: CATEGORY_ID,
        topic: interestName,
        zip: ZIPCODE,
        radius: MAX_RADIUS
      },
      (err, resp) => {
        if (resp) {
          const result = resp.results.map((group, idx) => {
            const title = group.name
            const description = group.description
            const sourceUrl = group.link
            const imageUrl = group.group_photo
              ? group.group_photo.highres_link
              : 'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            return {
              id: idx,
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
    interestName = interestName
      .split(' ')
      .join('-')
      .toLowerCase()
    if (interestName === 'women-in-tech') {
      interestName = 'witi'
    }

    let groups = await meetup.getGroups(
      {
        category_id: CATEGORY_ID,
        topic: interestName,
        zip: ZIPCODE,
        radius: MAX_RADIUS
      },
      async (err, resp) => {
        if (resp) {
          let data = []
          if (interestName !== 'witi') {
            data = resp.results.slice(0, 30)
          } else {
            data = resp.results
          }
          await data.map(async group => {
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
              console.log(error)
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
