import { reset } from 'redux-form';
import api from '../api'

export function fetchEmployees(company_id) {
  return dispatch => api.fetch('/employees/company/' + company_id)
    .then((response) => {
      dispatch({type: 'SET_EMPLOYEES', response: response.data});
    });
}

export function addEmployee(data) {
  return dispatch => api.post('/employees', {employee: data})
    .then((response) => {
      dispatch(reset('addEmployee'));
      dispatch({type: 'ADD_EMPLOYEE', response: response.data});
    });
}

export function deleteEmployee(id) {
  return dispatch => api.delete('/employees/' + id)
    .then(() => {
      dispatch({type: 'DELETE_EMPLOYEE', id: id});
    });
}
