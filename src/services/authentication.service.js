import axios from 'axios';
import {API_ENDPOINT} from '../constants/constants'

export const signup = (firstName,lastName, email, password) => {
  return axios.post(API_ENDPOINT + '/v1/auth/register', {
    firstName,
    lastName,
    email,
    password,
  }).then(response => {
    console.log(response)
    if (response?.data?.token?.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    }
    
  },error=>{
    console.log(error.response,"sdfgsdfgd")
    return error?.response;
  });
};

export const login = (email, password) => {
  return axios
    .post(API_ENDPOINT + '/v1/auth/login', {
      email,
      password,
    })
    .then(response => {
      if (response?.data?.token?.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response;
    },error=>{
     
      return error?.response?.data
    });
};

export const logout = () => {
  const info = getLoggedInUser();
  console.log(info)
  const refreshToken = info.token.refreshToken;
  const email = info.user.email;
  return axios
    .post(
      API_ENDPOINT + '/v1/auth/refresh-token',
      { refreshToken, email }
    )
    .then(response => {
      localStorage.clear();
      if (response) {
        localStorage.clear();
      }
    });
};

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};