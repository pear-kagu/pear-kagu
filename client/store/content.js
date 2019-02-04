import axios from 'axios'

//action types
const GET_MEETUPS = 'GET_MEETUPS'
const GET_YOUTUBES = 'GET_YOUTUBES'
const GET_NEWS = 'GET_NEWS'
const CLEAR_CONTENT = 'CLEAR_CONTENT'
const SET_CONTENT = 'SET_CONTENT'

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

export const clearContent = () => {
  return {
    type: CLEAR_CONTENT
  }
}

const setContent = content => {
  return {
    type: SET_CONTENT,
    content
  }
}

//thunk creators
export const fetchContent = (typeId, interestId) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/content/${typeId}/${interestId}`)
    if (typeId === '1') {
      dispatch(getNews(data))
    } else if (typeId === '2') {
      dispatch(getYoutubes(data))
    } else if (typeId === '3') {
      dispatch(getMeetups(data))
    }
  }
}

export const fetchSavedContent = (userId, interestId) => {
  return async dispatch => {
    console.log('made it to saved content thunk')
    console.log('userId', userId)
    const {data} = await axios.get(`/api/users/${userId}/content`)
    console.log('data in thunk', data)
    const {contents} = data
    const savedContent = contents.filter(content => {
      return Number(content.interestId) === Number(interestId)
    })
    dispatch(setContent(savedContent))
  }
}

//initial state
const initialState = []

//reducer

export default (state = initialState, action) => {
  const newState = [...state]
  switch (action.type) {
    case GET_MEETUPS:
      newState.meet = action.meetups
      return newState
    case GET_YOUTUBES:
      newState.watch = action.youtubes
      return newState
    case GET_NEWS:
      newState.read = action.news
      return newState
    case SET_CONTENT:
      return action.content
    case CLEAR_CONTENT:
      return initialState
    default:
      return state
  }
}
