import axios from 'axios'

//action types
const GET_MEETUPS = 'GET_MEETUPS'
const GET_YOUTUBES = 'GET_YOUTUBES'
const GET_NEWS = 'GET_NEWS'

//action creators
const getMeetups = meetups => {
  return {
    type: GET_MEETUPS,
    meetups
  }
}

const getYoutubes = youtubes => {
  return {
    type: GET_YOUTUBES,
    youtubes
  }
}

const getNews = news => {
  return {
    type: GET_NEWS,
    news
  }
}

//thunk creators
export const fetchContent = (typeId, interestId) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/content/${typeId}/${interestId}`)
    if (typeId === 1) {
      dispatch(getNews(data))
    } else if (typeId === 2) {
      dispatch(getYoutubes(data))
    } else if (typeId === 3) {
      dispatch(getMeetups(data))
    }
  }
}

//initial state
const initialState = {
  read: [],
  watch: [],
  do: []
}

//reducer

export default (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case GET_MEETUPS:
      newState.do = action.meetups
      return newState
    case GET_YOUTUBES:
      newState.watch = action.youtubes
      return newState
    case GET_NEWS:
      newState.read = action.news
      return newState
    default:
      return state
  }
}
