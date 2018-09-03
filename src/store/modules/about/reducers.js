import states from './states'
import actions from './actions'

export default function about (state = states.about, action) {
  switch (action.type) {
    case actions.START_AT_ABOUT_ME: 
      return {
        ...state,
        aboutMeStartPoint: action.aboutMeStartPoint
      }
    case actions.INVALID_VALUE_PASSED: 
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    default:
      return state
  }
}