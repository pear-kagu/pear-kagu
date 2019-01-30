const router = require('express').Router()
const {google} = require('googleapis')
const youtubeApiKey = process.env.YOUTUBEAPI_KEY
module.exports = router

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
      regionCode: 'US'
    })
    console.log(searchResult.data)
    res.json(searchResult.data)
  } catch (err) {
    console.log(err)
  }
})
