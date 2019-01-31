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
    dispatch(getInterests(data))
  }
}

//initial state
const initialState = {
  allInterests: []
}

//reducer
export default (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case GET_INTERESTS:
      newState.allInterests = action.interests
      return newState
    default:
      return state
  }
}
