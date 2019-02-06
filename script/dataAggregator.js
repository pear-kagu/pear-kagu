const axios = require('axios')
const server = 'http://pear-kagu.herokuapp.com'

//'http://localhost:8080'

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
    }
    for (let j = 0; j < allInterests.length; j++) {
      let interestId = allInterests[j].id
      let interestName = allInterests[j].name
      await axios.get(
        `${server}/api/youtube/primary/${interestId}/${interestName}`
      )
    }
    for (let k = 0; k < allInterests.length; k++) {
      let interestId = allInterests[k].id
      let interestName = allInterests[k].name
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
