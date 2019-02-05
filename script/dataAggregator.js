const axios = require('axios')

async function getInterests() {
  try {
    const {data} = await axios.get('http://localhost:8080/api/interests')
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
        `http://localhost:8080/api/newsapi/${allInterests[i].id}/${
          allInterests[i].name
        }`
      )
      await axios.get(
        `http://localhost:8080/api/youtube/${allInterests[i].id}/${
          allInterests[i].name
        }`
      )
      if (allInterests[i].name.split(' ').length === 1) {
        await axios.get(
          `http://localhost:8080/api/meetups/${allInterests[i].id}/${
            allInterests[i].name
          }`
        )
      }
    }
  } catch (err) {
    console.error(err)
  }
}

callApis()
