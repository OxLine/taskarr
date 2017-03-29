var initialState = {
  companies: [],
};

export default function(state = initialState, action) {
  switch(action.type){
    case 'SET_COMPANIES':
      return {...state, companies: action.response};
    case 'ADD_COMPANY':
      return {...state, companies: [...state.companies, action.response]};
    case 'DELETE_COMPANY':
      const new_companies =  state.companies.filter((company) => {
        return company.id!==action.id;
      });
      return {...state, companies: new_companies};
    default:
      return state;
  }
}
