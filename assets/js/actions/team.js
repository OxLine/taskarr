// TODO: (chernyshov) add team Tue 28 Mar 2017 08:27:54 PM EEST
// TODO: (chernyshov) fetch company teams Tue 28 Mar 2017 09:08:44 PM EEST
// TODO: (chernyshov) delete team Tue 28 Mar 2017 08:28:01 PM EEST
// TODO: (chernyshov) edit team name Tue 28 Mar 2017 08:28:06 PM EEST
import { reset } from 'redux-form';
import api from '../api'

export function fetchTeams(company_id) {
  return dispatch => api.fetch('/teams/company/' + company_id)
    .then((response) => {
      dispatch({type: 'SET_TEAMS', response: response.data});
    });
}

export function addTeam(data) {
  return dispatch => api.post('/teams', data)
    .then((response) => {
      dispatch(reset('addEmployee'));
      dispatch({type: 'ADD_TEAM', response: response.data});
    });
}

export function updateTeam(id) {
  return dispatch => api.patch('/teams/' + id)
    .then((response) => {
      dispatch({type: 'UPDATE_TEAM', response: response.data});
    });
}

export function deleteTeam(id) {
  return dispatch => api.delete('/teams/' + id)
    .then(() => {
      dispatch({type: 'DELETE_TEAM', id: id});
    });
}
