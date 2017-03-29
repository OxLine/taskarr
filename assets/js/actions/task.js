import { reset } from 'redux-form';
import api from '../api'

export function fetchTasks(company_id, team_id=null) {
  return dispatch => api.fetch('/tasks/company/' +
                                company_id + team_id?('/team/' + team_id):'')
    .then((response) => {
      dispatch({type: 'SET_TASKS', response: response.data});
    });
}

export function addTasks(data) {
  const tasks = data.split('/\r?\n/');
  return dispatch => api.post('/tasks', {...tasks})
    .then((response) => {
      dispatch(reset('addTasks'));
      dispatch({type: 'ADD_TASKS', response: response.data});
    });
}

export function deleteTask(id) {
  return dispatch => api.delete('/tasks/' + id)
    .then(() => {
      dispatch({type: 'DELETE_TASK', id: id});
    });
}
