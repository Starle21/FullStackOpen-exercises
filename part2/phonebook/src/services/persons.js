import axios from 'axios';

const baseURL = 'http://localhost:3002/persons';

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
