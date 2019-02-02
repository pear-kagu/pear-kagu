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
    }
  } catch (err) {
    console.error(err)
  }
}

callApis()
