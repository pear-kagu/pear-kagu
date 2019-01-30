const router = require('express').Router()
const {google} = require('googleapis')
const youtubeApiKey = process.env.YOUTUBEAPI_KEY
const {Content} = require('../db/models')
module.exports = router

// set paramaters
const API_SOURCE_ID = 1
const TYPE_ID = 2

var youtube = google.youtube({
  version: 'v3',
  auth: youtubeApiKey
})

router.get('/:topic', async (req, res, next) => {
  try {
    let topic = req.params.topic
    const searchResult = await youtube.search.list({
      part: 'id,snippet',
      q: topic,
      maxResults: 50,
      regionCode: 'US',
      relevanceLanguage: 'en'
    })

    // deconstruct data
    const {items} = searchResult.data
    await Promise.all(
      items.map(item => {
        const title = item.snippet.title
        const sourceUrl = `https://www.youtube.com/watch?v=${item.id.videoId}`
        const imageUrl =
          item.snippet.thumbnails.medium.url ||
          'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        const description = item.snippet.description
        const publishedAt = item.snippet.publishedAt
        Content.create({
          title,
          imageUrl,
          description,
          sourceUrl,
          publishedAt,
          typeId: TYPE_ID,
          apiSourceId: API_SOURCE_ID
        })
      })
    )
    res.json(items)
  } catch (err) {
    console.log(err)
  }
})
