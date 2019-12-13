import { ADD_CODE, REMOVE_CODE } from '../types'

const INITIAL_STATE = []

export default collectedCodesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CODE:
            if (state.find(code => code == action.code)) {
                return state;
            } else {
                return [
                    ...state,
                    action.code
                ]
            }
        case REMOVE_CODE:
            return state.filter(code => code != action.code)
        default:
            return state;
    }
}