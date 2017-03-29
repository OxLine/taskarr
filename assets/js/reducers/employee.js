var initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_EMPLOYEES':
      return action.response;
    case 'ADD_EMPLOYEE':
      return [...state, action.response];
    case 'DELETE_EMPLOYEE':
      var new_employees = state.slice();
      for (var i = 0; i < new_employees.length; i ++) {
        if (new_employees[i].id === action.id) {
          new_employees.splice(i, 1);
        }
      }
      return new_employees;
    default:
      return state;
  }
}
