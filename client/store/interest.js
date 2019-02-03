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

//thunk creators
export const fetchSelectedInterest = interestName => {
  return async dispatch => {
    const {data} = await axios.get(`/api/interests/${interestName}`)
    dispatch(setSelectedInterest(data))
  }
}

//initial state
const initialState = {
  allInterests: {},
  selectedInterest: {}
}

const createAllInterests = data => {
  const allInterests = {}
  data.forEach(interest => {
    if (!allInterests[interest.id]) {
      allInterests[interest.id] = {
        name: interest.name,
        read: [],
        watch: [],
        do: []
      }
    }
  })
  return allInterests
}
//reducer
export default (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case GET_INTERESTS:
      newState.allInterests = createAllInterests(action.interests)
      return newState
    case SET_SELECTED_INTEREST:
      const selectedInterest = {}
      selectedInterest[action.interest.id] = {
        name: action.interest.name,
        read: [],
        watch: [],
        do: []
      }
      newState.selectedInterest = selectedInterest
      return newState
    default:
      return state
  }
}
