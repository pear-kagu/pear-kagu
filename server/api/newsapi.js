const NewsAPI = require('newsapi')
const newsapikey = process.env.NEWSAPI_KEY
const newsapi = new NewsAPI(newsapikey)
const router = require('express').Router()
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
    res.status(200).send(all)
  } catch (err) {
    next(err)
  }
})
