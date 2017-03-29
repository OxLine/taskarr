import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import session from './session';
import company from './company.js'
import employees from './employee';
import teams from './team';

const appReducer = combineReducers({
  form,
  session,
  company,
  routing: routerReducer,
  employees: employees,
  teams: teams,
});

export default function (state, action) {
  if( action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
