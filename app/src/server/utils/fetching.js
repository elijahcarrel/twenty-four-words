import { apiURL } from "server/init";

const fetchJson = (endpoint, obj = {}, method) => {
  return fetch(apiURL + endpoint, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};

export const postJson = (endpoint, obj) => {
  return fetchJson(endpoint, obj, 'POST');
};

export const putJson = (endpoint, obj) => {
  return fetchJson(endpoint, obj, 'PUT');
};

export const getJson = (endpoint, obj) => {
  return fetchJson(endpoint, obj, 'GET');
};
