import axios from 'axios'

//action types
const GET_INTERESTS = 'GET_INTERESTS'

//action creators
const getInterests = interests => {
  return {
    type: GET_INTERESTS,
    interests
  }
}

//thunk creators
export const fetchInterests = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/interests')
    const interests = data.map(curInterest => {
      return curInterest.name
    })
    dispatch(getInterests(interests))
  }
}

export const fetchUserInterests = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/interests`)
    dispatch(getInterests(data))
  }
}

//initial state
const initialState = []
//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERESTS:
      return action.interests
    default:
      return state
  }
}
