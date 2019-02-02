import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_SAVED_CONTENT = 'SET_SAVED_CONTENT'

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  savedContent: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

const setSavedContent = contentId => {
  return {
    type: SET_SAVED_CONTENT,
    contentId
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const setSavedContentinDB = (userId, contentId) => {
  return async dispatch => {
    const {data} = await axios.post(`api/users/${userId}/content`, contentId)
    dispatch(setSavedContent(data))
  }
}

export const auth = formInfo => async dispatch => {
  let res
  console.log('in thunk', formInfo)
  const {
    firstName,
    lastName,
    username,
    email,
    city,
    state,
    zipcode,
    password,
    formName
  } = formInfo
  try {
    res = await axios.post(`/auth/${formName}`, {
      firstName,
      lastName,
      username,
      email,
      city,
      state,
      zipcode,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  const newState = {...state}
  switch (action.type) {
    case GET_USER:
      newState.user = action.user
      return newState
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
