import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER_CONTENT = 'GET_USER_CONTENT'

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
const getContent = content => ({type: GET_USER_CONTENT, content})

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

export const auth = formInfo => async dispatch => {
  let res
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

// thunk to fetch user content
export const fetchUserContent = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/content`)
    dispatch(getContent(data))
  }
}

//thunk to set user content
export const setSavedContentinDB = (userId, contentId) => {
  return async dispatch => {
    await axios.post(`api/users/${userId}/content`, contentId)
    dispatch(fetchUserContent(userId))
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
    case GET_USER_CONTENT:
      newState.savedContent = action.content
      return newState
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
