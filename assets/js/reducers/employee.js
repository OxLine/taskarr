var initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SET_EMPLOYEES':
      return action.response;
    case 'ADD_EMPLOYEE':
      return [...state, action.response];
    case 'UPDATE_EMPLOYEE':
      return state.map((emp) => {
        if (emp.id === action.response.id) {
          return {...emp, ...action.response};
        } else {
          return emp;
        }
      });
    case 'DELETE_EMPLOYEE':
      return state.filter((employee) => {
        return employee.id!==action.id;
      });
    case 'NULL_EMPLOYEE_TEAM':
      return state.map((emp) => {
        if (emp.team_id === action.team_id) {
          return {...emp, team_id: null};
        } else {
          return emp;
        }
      });
    default:
      return state;
  }
}
