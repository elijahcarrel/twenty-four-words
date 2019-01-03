import { apiURL } from "~/server/init";

const fetchJson = async (endpoint, obj = {}, method): Promise<{ error: any, result: any, ok: boolean }> => {
  // @ts-ignore TODO(ecarrel) fix this
  return await fetch(apiURL + endpoint, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};

export const postJson = (endpoint, obj?: Object) => {
  return fetchJson(endpoint, obj, 'POST');
};

export const putJson = (endpoint, obj?: Object) => {
  return fetchJson(endpoint, obj, 'PUT');
};

export const getJson = (endpoint, obj?: Object) => {
  return fetchJson(endpoint, obj, 'GET');
};
