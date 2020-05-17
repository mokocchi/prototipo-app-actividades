import { combineReducers } from 'redux'
import model from './model'
import currentTask from './currentTask'
import taskResults from './taskResults'
import collectedCodes from './collectedCodes'

export default combineReducers({
    model,
    currentTask,
    taskResults,
    collectedCodes
})