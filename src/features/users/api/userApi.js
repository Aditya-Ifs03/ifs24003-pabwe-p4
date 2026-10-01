import { fetchWithAuth } from '../../../helpers/apiHelper';

export const getUsers = async () => fetchWithAuth('/users');
export const getMyProfile = async () => fetchWithAuth('/users/me');

export const updateMyProfile = async ({ name, username }) => {
  return fetchWithAuth('/users/me', {
    method: 'PUT',
    body: JSON.stringify({ name, username }),
  });
};

export const updateMyPhoto = async (photoFile) => {
  const formData = new FormData();
  formData.append('photo', photoFile);
  return fetchWithAuth('/users/me/photo', {
    method: 'POST',
    body: formData,
  });
};

export const updateMyPassword = async ({ old_password, new_password }) => {
  return fetchWithAuth('/users/me/password', {
    method: 'PUT',
    body: JSON.stringify({ old_password, new_password }),
  });
};