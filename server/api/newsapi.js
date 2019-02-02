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

    articlesReturned.articles.map(async article => {
      const title = article.title
      const imageUrl =
        article.urlToImage ||
        'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      const description = article.description
      const sourceUrl = article.url
      const publishedAt = article.publishedAt
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
        console.log('Duplicated article not added')
      }
    })

    res.status(200).send(articlesReturned)
  } catch (err) {
    next(err)
  }
})
