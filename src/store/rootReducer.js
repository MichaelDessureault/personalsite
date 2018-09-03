import { combineReducers } from 'redux'
import * as reducers from './modules'

export const appReducer = combineReducers({
  ...reducers
})


export const rootReducer = (state, action) => {
  if (action.type === "LOGGING_OUT") {
    state = undefined
  }

  return appReducer(state, action);
}