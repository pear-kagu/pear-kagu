const NewsAPI = require('newsapi')
import {newsapikey} from '../../secrets'
const newsapi = new NewsAPI(newsapikey)
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2
  .topHeadlines({
    sources: 'bbc-news,the-verge',
    q: 'bitcoin',
    category: 'business',
    language: 'en',
    country: 'us'
  })
  .then(response => {
    console.log(response)
    /*
    {
      status: "ok",
      articles: [...]
    }
  */
  })
// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2
  .everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2018-11-01',
    to: '2019-01-12',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  })
  .then(response => {
    console.log(response)
    /*
    {
      status: "ok",
      articles: [...]
    }
  */
  })
