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
    // TODO: (chernyshov) fix unexpected end of JSON input Tue 28 Mar 2017 05:06:23 PM EEST

    dispatch({type: 'DELETE_COMPANY', id: id});
    api.delete('/companies/' + id)
      .then(() => {
      });
  };
}
