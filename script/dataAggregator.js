const axios = require('axios')
const server = 'http://localhost:8080'
//'http://pear-kagu.herokuapp.com'

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
      let interestId = allInterests[i].id
      let interestName = allInterests[i].name
      await axios.get(
        `${server}/api/newsapi/primary/${interestId}/${interestName}`
      )
      await axios.get(
        `${server}/api/youtube/primary/${interestId}/${interestName}`
      )
      await axios.get(
        `${server}/api/meetups/primary/${interestId}/${interestName}`
      )
    }
  } catch (err) {
    console.error(err)
  }
}

// make call to all apis
callApis()
