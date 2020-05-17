import { SET_TASK_RESULT, CLEAR_TASK_RESULT } from '../types'

const INITIAL_STATE = []

export default taskResultReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TASK_RESULT:
            if (state.find(item => item.code == action.task)) {
                return state.map(item => item.code == action.task? {code: action.task,result: action.result,type: action.taskType}: item);
            } else {
                return [
                    ...state,
                    {
                        code: action.task,
                        result: action.result,
                        type: action.taskType
                    }
                ]
            }
        case CLEAR_TASK_RESULT:
            return INITIAL_STATE;
        default:
            return state;
    }
}