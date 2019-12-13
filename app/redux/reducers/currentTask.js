import { SET_CURRENT_TASK, NEXT_TASK } from '../types'

const INITIAL_STATE = 0

export default configReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_TASK:
            return action.payload
        case NEXT_TASK:
            return state + 1 //check for array boundary!
        default:
            return state;
    }
}