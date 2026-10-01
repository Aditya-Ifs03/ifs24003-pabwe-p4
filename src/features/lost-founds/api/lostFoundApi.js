import { fetchWithAuth } from '../../../helpers/apiHelper';

export const getLostFounds = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (typeof params.is_completed !== 'undefined') query.append('is_completed', params.is_completed);
  if (params.is_me) query.append('is_me', params.is_me);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return fetchWithAuth(`/lost-founds${qs}`);
};

export const getLostFoundById = async (id) => fetchWithAuth(`/lost-founds/${id}`);

export const postLostFound = async ({ title, description, status }) => {
  return fetchWithAuth('/lost-founds', {
    method: 'POST',
    body: JSON.stringify({ title, description, status }),
  });
};

export const putLostFound = async (id, { title, description, status, is_completed }) => {
  return fetchWithAuth(`/lost-founds/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description, status, is_completed: Number(is_completed) }),
  });
};

export const postLostFoundCover = async (id, coverFile) => {
  const formData = new FormData();
  formData.append('cover', coverFile);
  return fetchWithAuth(`/lost-founds/${id}/cover`, {
    method: 'POST',
    body: formData,
  });
};

export const deleteLostFound = async (id) => {
  return fetchWithAuth(`/lost-founds/${id}`, {
    method: 'DELETE',
  });
};

export const getDailyStats = async () => fetchWithAuth('/lost-founds/stats/daily');
export const getMonthlyStats = async () => fetchWithAuth('/lost-founds/stats/monthly');