import {LOAD_MODEL, SET_CURRENT_TASK, NEXT_TASK, SET_TASK_RESULT, ADD_CODE, REMOVE_CODE} from '../types'

export const loadModel = data => (
    {
      type: LOAD_MODEL,
      payload: data,
    }
  );

export const setCurrentTask = data => (
    {
        type: SET_CURRENT_TASK,
        payload: data
    }
)

export const nextTask = () => (
  {
    type: NEXT_TASK
  }
)

export const setTaskResult = (task, result, type) => (
  {
    type: SET_TASK_RESULT,
    task: task,
    result: result,
    taskType: type
  }
)

export const addCollectedCode = (code) => (
  {
    type: ADD_CODE,
    code: code
  }
)

export const removeCollectedCode = (code) => (
  {
    type: REMOVE_CODE,
    code: code
  }
)