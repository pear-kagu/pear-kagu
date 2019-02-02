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
    let idx = 0

    await axios.get(
      `http://localhost:8080/api/newsapi/${allInterests[idx].id}/${
        allInterests[idx].name
      }`
    )
    idx++
    await axios.get(
      `http://localhost:8080/api/newsapi/${allInterests[idx].id}/${
        allInterests[idx].name
      }`
    )
    idx++
    await axios.get(
      `http://localhost:8080/api/newsapi/${allInterests[idx].id}/${
        allInterests[idx].name
      }`
    )
    idx++
    await axios.get(
      `http://localhost:8080/api/newsapi/${allInterests[idx].id}/${
        allInterests[idx].name
      }`
    )
    idx++
    await axios.get(
      `http://localhost:8080/api/newsapi/${allInterests[idx].id}/${
        allInterests[idx].name
      }`
    )
    idx++
    await axios.get(
      `http://localhost:8080/api/newsapi/${allInterests[idx].id}/${
        allInterests[idx].name
      }`
    )
  } catch (err) {
    console.error(err)
  }
}

callApis()
