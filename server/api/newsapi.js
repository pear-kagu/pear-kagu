const NewsAPI = require('newsapi')
//const {newsapikey} = require('../../secrets')
const newsapikey = process.env.NEWSAPI_KEY

const newsapi = new NewsAPI(newsapikey)
const router = require('express').Router()
module.exports = router

// All options passed to topHeadlines are optional, but you need to include at least one of them
//GET route /api/newsapi/top
router.get('/top/:interest', async (req, res, next) => {
  const interest = req.params.interest
  try {
    console.log('get top')
    const topHeadlines = await newsapi.v2.topHeadlines({
      // sources: 'bbc-news,the-verge',
      q: interest,
      // category: 'business',
      sortBy: 'relevancy',
      language: 'en',
      country: 'us'
    })
    res.status(200).send(topHeadlines)
  } catch (err) {
    next(err)
  }
})

//GET route /api/newsapi/all
// You must include at least one q, source, or domain
router.get('/all/:interest', async (req, res, next) => {
  const interest = req.params.interest
  try {
    console.log('get all')
    const all = await newsapi.v2.everything({
      q: interest,
      /*sources: 'wired, techcrunch, hacker-news',
      domains: 'wired.com, techcrunch.com, news.ycombinator.com',
      domains: 'news.ycombinator.com',
      */
      sources: 'hacker-news',
      from: '2019-01-01',
      to: '2019-01-28',
      language: 'en',
      sortBy: 'relevancy'
      // page: 1
    })
    res.status(200).send(all)
  } catch (err) {
    next(err)
  }
})
