import fetch from 'isomorphic-fetch';

async function sendRequest(path, options = {}) {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

const response = await fetch(
    `http://localhost:3000${path}`,
    Object.assign({ method: 'POST', credentials: 'include' }, { headers }, options),
  );

const data = await response.json();

if (data.error) {
    throw new Error(data.error);
  }

return data;
}

export const subscribeToNewsletter = ({ email }) =>
  sendRequest('/api/v1/public/subscribe', {
    body: JSON.stringify({ email }),
  });