const router = require('express').Router()
const {ApiSource} = require('../db/models')
const axios = require('axios')
// const server = 'http://localhost:8080'
const server = 'http://localhost:8080'

module.exports = router

async function callApis(sourcesArr) {
  const result = []
  for (let i = 0; i < sourcesArr.length; i++) {
    try {
      const {data} = await axios.get(`${sourcesArr[i]}`)
      data.forEach(singleResult => result.push(singleResult))
    } catch (err) {
      console.error(err)
    }
  }
  return result
}

router.get('/:interestName', async (req, res, next) => {
  try {
    const interestName = req.params.interestName
    const sources = await ApiSource.findAll()
    const routes = sources.map(source => {
      return `${server}${source.route}/search/${interestName}`
    })
    const result = await callApis(routes)
    res.send(result)
  } catch (err) {
    console.error(err)
  }
})
