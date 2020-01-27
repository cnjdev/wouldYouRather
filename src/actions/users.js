import { saveUser } from '../data/DataAPI'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

function addUser (user) {
  return {
    type: ADD_USER,
    user
  }
}

export function handleAddUser (id, user, avatarURL) {
  return (dispatch, getState) => {

    dispatch(showLoading())

    return saveUser({
      id,
      user,
      avatarURL
    })
    .then((user) => dispatch(addUser(user)))
    .then(() => dispatch(hideLoading()))
  }
}