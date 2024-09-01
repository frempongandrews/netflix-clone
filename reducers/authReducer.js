import {
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  GET_CURRENT_USER_SUCCESS,
  SET_ERROR,
  GET_CURRENT_USER_ERROR,
} from "../actions/authActions"

export const initialState = {
  currentUser: null,
  error: "",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        error: "",
      }
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        error: action?.message || "Error getting user",
        currentUser: null,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: "",
      }
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        error: action?.message || "Error logging out",
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.message,
      }
    default:
      return state
  }
}

export default authReducer
