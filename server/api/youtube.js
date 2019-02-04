// get required modules
const router = require('express').Router()
const {google} = require('googleapis')
const {Content} = require('../db/models')
module.exports = router

// set paramaters
const TYPE_ID = 2
const API_SOURCE_ID = 1
const SEARCH_PARAMS = 'Technology'

const youtubeApiKey = process.env.YOUTUBEAPI_KEY

const youtube = google.youtube({
  version: 'v3',
  auth: youtubeApiKey
})

router.get('/:interestId/:interestName', async (req, res, next) => {
  try {
    const {interestId, interestName} = req.params
    const queryStr = `${interestName} ${SEARCH_PARAMS}`
    const searchResult = await youtube.search.list({
      part: 'id,snippet',
      q: queryStr,
      maxResults: 30,
      regionCode: 'US',
      relevanceLanguage: 'en',
      type: 'video',
      order: 'date'
    })

    // deconstruct data
    const {items} = searchResult.data
    items.map(async item => {
      const title = item.snippet.title
      const sourceUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`
      const imageUrl =
        item.snippet.thumbnails.medium.url ||
        'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      const description = item.snippet.description
      const publishedAt = item.snippet.publishedAt
      try {
        await Content.findOrCreate({
          where: {
            title,
            imageUrl,
            description,
            sourceUrl,
            publishedAt,
            typeId: TYPE_ID,
            apiSourceId: API_SOURCE_ID,
            interestId
          }
        })
      } catch (err) {
        console.log('Duplicated video not added')
      }
    })
    res.json(items)
  } catch (err) {
    console.log(err)
  }
})
