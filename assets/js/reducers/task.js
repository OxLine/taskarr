var initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_TASKS':
      return action.response;
    case 'ADD_TASKS':
      return [...state, ...action.response];
    case 'DELETE_TASK':
      return state.filter((task) => {
        return task.id!==action.id;
      });
    case 'UPDATE_TASK':
      return state.map((task) => {
        if (task.id === action.response.id) {
          return {...task, ...action.response};
        } else {
          return task;
        }
      });
    default:
      return state;
  }
}
