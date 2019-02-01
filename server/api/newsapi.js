const NewsAPI = require('newsapi')
const newsapikey = process.env.NEWSAPI_KEY
const newsapi = new NewsAPI(newsapikey)
const router = require('express').Router()
const {Content} = require('../db/models')
module.exports = router

// set type and api source id
const TYPE_ID = 1
const API_SOURCE_ID = 3

//GET route /api/newsapi
// You must include at least one q, source, or domain
router.get('/:interestId/:interestName', async (req, res, next) => {
  const {interestId, interestName} = req.params
  console.log('interestId', interestId)
  console.log('interestName', interestName)
  const today = new Date()
  try {
    const articlesReturned = await newsapi.v2.everything({
      q: interestName,
      sources: 'wired, techcrunch, hacker-news',
      from: today - 30,
      to: today,
      language: 'en',
      sortBy: 'relevancy'
    })
    await Promise.all(
      articlesReturned.articles.map(article => {
        const title = article.title
        const imageUrl =
          article.urlToImage ||
          'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        const description = article.description
        const sourceUrl = article.url
        const publishedAt = article.publishedAt
        console.log('title', title)
        console.log('interestId2', interestId)
        Content.findOrCreate({
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
      })
    )
    res.status(200).send(articlesReturned)
  } catch (err) {
    next(err)
  }
})
