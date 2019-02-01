import axios from 'axios'

//action types
const GET_INTERESTS = 'GET_INTERESTS'
const SET_SELECTED_INTEREST = 'SET_SELECTED_INTEREST'

//action creators
const getInterests = interests => {
  return {
    type: GET_INTERESTS,
    interests
  }
}

export const setSelectedInterest = interest => {
  return {
    type: SET_SELECTED_INTEREST,
    interest
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
  allInterests: [],
  selectedInterest: {}
}

//reducer
export default (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case GET_INTERESTS:
      newState.allInterests = action.interests
      return newState
    case SET_SELECTED_INTEREST:
      newState.selectedInterest = action.interest
      return newState
    default:
      return state
  }
}
