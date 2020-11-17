import axios from 'axios';
import * as actionTypes from '../reducerType';

export const editProfile = (token, formData) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:4004/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res);
        dispatch({ type: actionTypes.ON_EDIT_USER, user: res.data });
        resolve(res);
      }).catch(err => {
        let error = 'something went wrong!';
        if(err.response && err.response.data.error.msg) {
          error = err.response.data.error.msg;
        }
        reject(error);
      });
    });
  }
};