// import actions from './actions'
import actionCreators from './actionCreators'
import { isValidType } from '../../../helpers/utils'

/**
 * handleAboutStartPoint
 *  - True  is about me
 *  - False is about site
 * @param {Boolean} value 
 */
function handleAboutStartPoint (value) {
  return function (dispatch) {
    if (isValidType(value, ["boolean"])) {
      dispatch (actionCreators.setAboutStartPoint(value))
    } else {
      dispatch (actionCreators.invalidValuePassed("handleAboutStartPoint only accepts boolean"))
    }
  }
}

export default {
  handleAboutStartPoint
}