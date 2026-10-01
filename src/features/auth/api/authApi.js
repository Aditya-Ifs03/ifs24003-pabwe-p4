import { fetchWithAuth } from '../../../helpers/apiHelper';

export const postLogin = async ({ email, password }) => {
  return fetchWithAuth('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const postRegister = async ({ name, username, email, password }) => {
  return fetchWithAuth('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, username, email, password }),
  });
};