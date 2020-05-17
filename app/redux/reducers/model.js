import { LOAD_MODEL } from '../types'

const INITIAL_STATE = {}

export default configReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_MODEL:
            return action.payload
        default:
            return state;
    }
}