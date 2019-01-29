const NewsAPI = require('newsapi')
const newsapikey = process.env.NEWSAPI_KEY
const newsapi = new NewsAPI(newsapikey)
const router = require('express').Router()
const {Content} = require('../db/models')
module.exports = router

//GET route /api/newsapi
// You must include at least one q, source, or domain
router.get('/:interest', async (req, res, next) => {
  const interest = req.params.interest
  const today = new Date()
  try {
    const all = await newsapi.v2.everything({
      q: interest,
      sources: 'wired, techcrunch, hacker-news',
      from: today - 30,
      to: today,
      language: 'en',
      sortBy: 'relevancy'
    })
    const articlesInDB = await Promise.all(
      all.articles.map(article => {
        console.log('eeee', article.urlToImage)
        const title = article.title
        const imageUrl = article.urlToImage
        const description = article.description
        const sourceUrl = article.url
        const publishedAt = article.publishedAt

        Content.create({
          title,
          imageUrl,
          description,
          sourceUrl,
          publishedAt
        })
      })
    )
    res.status(200).send(all)
  } catch (err) {
    next(err)
  }
})
