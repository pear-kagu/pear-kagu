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
    let interestResponse = await axios.get(`/api/interests/${interestName}`)
    const {id, name} = interestResponse.data
    let contentResponse = await axios.get(`/api/content/${id}`)
    const contentData = contentResponse.data
    const read = contentData.filter(content => content.typeId === 1)
    const watch = contentData.filter(content => content.typeId === 2)
    const meet = contentData.filter(content => content.typeId === 3)
    const selectedInterest = {
      id,
      name,
      read,
      watch,
      meet
    }
    dispatch(setSelectedInterest(selectedInterest))
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
      newState.selectedInterest = action.interest
      return newState
    default:
      return state
  }
}
