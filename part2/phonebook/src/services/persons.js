import axios from 'axios';

// backend on localhost
// const baseURL = 'http://localhost:3005/api/persons';
// backend on Heroku
// const baseURL = 'https://evening-eyrie-68904.herokuapp.com/api/persons';
// relative address
const baseURL = '/api/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseURL, newObject);
  return request.then(response => response.data);
};

const remove = id => {
  axios.delete(`${baseURL}/${id}`);

  // return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then(response => response.data);
};

const obj = { getAll, create, remove, update };

export default obj;
