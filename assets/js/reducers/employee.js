var initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_EMPLOYEES':
      return action.response;
    case 'ADD_EMPLOYEE':
      return [...state, action.response]
    default:
      return state;
  }
}
