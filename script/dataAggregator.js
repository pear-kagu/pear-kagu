const axios = require('axios')
require('dotenv').config()
const server = process.env.SERVER

async function getInterests() {
  try {
    const {data} = await axios.get(`${server}/api/interests`)
    return data
  } catch (err) {
    console.error(err)
  }
}

async function callApis() {
  try {
    const allInterests = await getInterests()

    for (let i = 0; i < allInterests.length; i++) {
      await axios.get(
        `${server}/api/newsapi/${allInterests[i].id}/${allInterests[i].name}`
      )
      await axios.get(
        `${server}/api/youtube/${allInterests[i].id}/${allInterests[i].name}`
      )
      if (allInterests[i].name.split(' ').length === 1) {
        await axios.get(
          `${server}/api/meetups/${allInterests[i].id}/${allInterests[i].name}`
        )
      }
    }
  } catch (err) {
    console.error(err)
  }
}

// make call to all apis
callApis()
