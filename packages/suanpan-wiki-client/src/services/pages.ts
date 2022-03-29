import axios from 'axios';

export const listPages = () => {
  return axios('/pages/list', {
    method: 'get'
  });
}