import axios from 'axios'

//action types
const SET_CONTENT = 'SET_CONTENT'
const CLEAR_CONTENT = 'CLEAR_CONTENT'

//action creators

const setContent = content => {
  return {
    type: SET_CONTENT,
    content
  }
}

export const clearContent = () => {
  return {
    type: CLEAR_CONTENT
  }
}

//thunk creators
export const fetchContent = interestName => {
  return async dispatch => {
    let read = []
    let watch = []
    let meet = []
    let interestResponse = await axios.get(`/api/interests/${interestName}`)
    const {id} = interestResponse.data
    if (id) {
      let contentResponse = await axios.get(`/api/content/${id}`)
      const contentData = contentResponse.data
      read = contentData.filter(content => content.typeId === 1)
      if (!read.length) {
        read = `Sorry, there's no reading content available for ${interestName}`
      }
      watch = contentData.filter(content => content.typeId === 2)
      if (!watch.length) {
        watch = `Sorry, there's no video content available for ${interestName}`
      }
      meet = contentData.filter(content => content.typeId === 3)
      if (!meet.length) {
        meet = `Sorry, there are no meet-ups available available for ${interestName}`
      }
    }
    const content = {
      read,
      watch,
      meet
    }
    dispatch(setContent(content))
  }
}

export const fetchSavedContent = (userId, interestName) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/content`)
    const {contents} = data
    let interestResponse = await axios.get(`/api/interests/${interestName}`)
    const {id} = interestResponse.data
    const interestContent = contents.filter(content => {
      return Number(content.interest.id) === Number(id)
    })
    const read = interestContent.filter(content => content.typeId === 1)
    const watch = interestContent.filter(content => content.typeId === 2)
    const meet = interestContent.filter(content => content.typeId === 3)
    const content = {
      read,
      watch,
      meet
    }
    dispatch(clearContent())
    dispatch(setContent(content))
  }
}

export const fetchSearchContent = interestName => {
  return async dispatch => {
    let read = []
    let watch = []
    let meet = []
    const {data} = await axios.get(`/api/search/${interestName}`)
    read = data.filter(content => content.typeId === 1)
    if (!read.length) {
      read = `Sorry, there's no reading content available for ${interestName}`
    }
    watch = data.filter(content => content.typeId === 2)
    if (!watch.length) {
      watch = `Sorry, there's no video content available for ${interestName}`
    }
    meet = data.filter(content => content.typeId === 3)
    if (!meet.length) {
      meet = `Sorry, there are no meet-ups available available for ${interestName}`
    }
    const content = {
      read,
      watch,
      meet
    }
    dispatch(clearContent())
    dispatch(setContent(content))
  }
}

export const deleteSavedContentinDB = (userId, contentId, interestName) => {
  return async dispatch => {
    await axios.delete(`/api/users/${userId}/content/${contentId}`)
    dispatch(fetchSavedContent(userId, interestName))
  }
}
//initial state
const initialState = {
  read: [],
  watch: [],
  meet: []
}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return action.content
    case CLEAR_CONTENT:
      return initialState
    default:
      return state
  }
}
