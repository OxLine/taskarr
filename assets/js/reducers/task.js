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
    default:
      return state;
  }
}
