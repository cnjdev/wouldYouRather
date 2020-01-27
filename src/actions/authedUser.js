import { showLoading, hideLoading } from 'react-redux-loading'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export function handleLogin(id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(setAuthedUser(id))
    dispatch(hideLoading())
  }
}

export function handleLogout() {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(setAuthedUser(null))
    dispatch(hideLoading())
  }
}