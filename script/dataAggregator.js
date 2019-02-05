const axios = require('axios')

async function getInterests() {
  try {
    const {data} = await axios.get(
      'http://pear-kagu.herokuapp.com/api/interests'
    )
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
        `http://pear-kagu.herokuapp.com/api/newsapi/${allInterests[i].id}/${
          allInterests[i].name
        }`
      )
      await axios.get(
        `http://pear-kagu.herokuapp.com/api/youtube/${allInterests[i].id}/${
          allInterests[i].name
        }`
      )
      if (allInterests[i].name.split(' ').length === 1) {
        await axios.get(
          `http://pear-kagu.herokuapp.com/api/meetups/${allInterests[i].id}/${
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
