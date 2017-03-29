var initialState = {
  companies: [], 
}

export default function(state = initialState, action) {
  switch(action.type){
    case 'SET_COMPANIES':
      return {...state, companies: action.response}
    case 'ADD_COMPANY':
      return {...state, companies: [...state.companies, action.response]}
    case 'DELETE_COMPANY':
      var new_companies = state.companies.slice(); 
      for (var i = 0; i < new_companies.length; i++) {
        if (new_companies[i].id === action.id) {
          new_companies.splice(i, 1);
          break;
        }
      }
      return {...state, companies: new_companies}
    default:
      return state
  }
}
