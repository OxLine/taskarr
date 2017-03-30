var initialState = [];

export default function (state = initialState, action) {
  switch(action.type) {
    case 'SET_TEAMS':
      return action.response;
    case 'ADD_TEAM':
      return [...state, action.response];
    case 'UPDATE_TEAM':
      var new_teams = state.slice();
      for (var i = 0; i < new_teams.length; i++) {
        if (new_teams[i].id === action.response.id) {
          new_teams[i] = {...new_teams[i], ...action.response};
        }
      }
      return new_teams;
    case 'DELETE_TEAM':
      return state.filter((team) => {
        return team.id!==action.id;
      });
    default:
      return state;
  }
}
