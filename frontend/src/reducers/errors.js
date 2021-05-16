import { LOGIN_FAIL, SIGNUP_FAIL, PASSWORD_RESET_FAIL, ACTIVATION_FAIL, PASSWORD_RESET_CONFIRM_FAIL } from '../actions/types'

const initialState = {
   msg: {},
   status: null
}

export default function (state = initialState, action) {
   switch (action.type) {
      case LOGIN_FAIL:
         return {
            msg: action.payload.msg,
            status: action.payload.status
         }
      case SIGNUP_FAIL:
         return {
            msg: action.payload.msg,
            status: action.payload.status
         }
      case PASSWORD_RESET_FAIL:
         return {
            msg: action.payload.msg,
            status: action.payload.status
         }
      case PASSWORD_RESET_CONFIRM_FAIL:
         return {
            msg: action.payload.msg,
            status: action.payload.status
         }
      case ACTIVATION_FAIL:
         return {
            msg: action.payload.msg,
            status: action.payload.status
         }
      default:
         return state
   }
}