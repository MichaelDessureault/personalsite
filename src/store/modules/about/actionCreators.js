import actions from './actions'

/**
 * setAboutStartPoint
 *  - True  is about me
 *  - False is about site
 * @param {Boolean} value 
 */
function setAboutStartPoint (value) {
  return {
    type: actions.START_AT_ABOUT_ME,
    aboutMeStartPoint: value
  }
}

function invalidValuePassed (errorMessage) {
  return {
    type: actions.INVALID_VALUE_PASSED,
    errorMessage: errorMessage.toString()
  }
}

export default {
  setAboutStartPoint,
  invalidValuePassed
}