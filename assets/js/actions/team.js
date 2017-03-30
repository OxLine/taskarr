import { reset } from 'redux-form';
import api from '../api';

export function fetchTeams(company_id) {
  return dispatch => api.fetch('/teams/company/' + company_id)
    .then((response) => {
      dispatch({type: 'SET_TEAMS', response: response.data});
    });
}

export function fetchTeamsNames(company_id) {
  // надо фетчить список команд, а не всех работяг у которых есть команда
  return dispatch => api.fetch('/teams/company/' + company_id)
    .then((response) => {
      dispatch({type: 'SET_TEAMS', response: response.data});
    });
}

export function addTeam(data) {
  return dispatch => api.post('/teams', {team: data})
    .then((response) => {
      dispatch(reset('addTeam'));
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
      dispatch({type: 'NULL_EMPLOYEE_TEAM', team_id: id});
    });
}

export function setTeamleader(team_id, teamlid_id) {
  return dispatch => {
    dispatch({type: 'UPDATE_TEAM', response: {id: team_id, teamlid_id: teamlid_id}});
    dispatch({type: 'UPDATE_EMPLOYEE', response: {id: teamlid_id, team_id: team_id}});
    //  api.post('/teams/teamlead/' + team_id)
    //  .then((response) => {
    //    dispatch({type: 'UPDATE_TEAM', response: response.data});
    //  });
  };
}
