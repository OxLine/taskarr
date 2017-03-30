import { reset } from 'redux-form';
import api from '../api';

export function fetchTasksByCompany(company_id) {
  return dispatch => api.fetch('/tasks/company/' + company_id)
    .then((response) => {
      console.log(response);
      dispatch({type: 'SET_TASKS', response: response.data});
    });
}

export function fetchTasksByTeam(team_id) {
  return dispatch => api.fetch('/tasks/team/' + team_id)
    .then((response) => {
      dispatch({type: 'SET_TASKS', response: response.data});
    });
}

export function fetchTasks() {
  return dispatch => api.fetch('/tasks')
    .then((response) => {
      dispatch({type: 'SET_TASKS', response: response.data});
    });
}

export function addTasks(data) {
  var tasks = data.tasks.split('\n\n');
  tasks = tasks.filter((task) => task.length > 0);
  return dispatch => api.post('/tasks/' + data.company_id, {tasks: tasks})
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
