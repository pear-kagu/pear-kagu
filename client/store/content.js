import axios from 'axios'

//action types
const GET_CONTENT = 'GET_CONTENT'

//action creators
const getContent = content => {
  return {
    type: GET_CONTENT,
    content
  }
}

//thunk creators
export const fetchMeetups = () => {
  return async dispath => {}
}

//initial state

//reducer
