import { reset } from 'redux-form';
import api from '../api';

export function createCompany(data) {
  return dispatch => api.post('/companies', {company: data})
    .then((response) => {
      dispatch(reset('createCompany'));
      dispatch({type: 'ADD_COMPANY', response: response.data});
    });
}

export function getCompanies() {
  return dispatch => {
    dispatch({type: 'START_FETCHING_COMPANIES'});
    api.fetch('/companies')
      .then((response) => {
        dispatch({type: 'SET_COMPANIES', response: response.data});
      });
  };
}

export function deleteCompany(id) {
  return  dispatch => {
    api.delete('/companies/' + id)
      .then(() => {
        dispatch({type: 'DELETE_COMPANY', id: id});
      });
  };
}
