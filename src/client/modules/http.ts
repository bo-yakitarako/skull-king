import axiosBase from 'axios';

axiosBase.defaults.withCredentials = true;
const axios = axiosBase.create({
  baseURL: '/',
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get<API>(path: string, params = {} as { [key in string]: any }) {
  const { data } = await axios.get<API>(path, {
    method: 'get',
    params,
  });
  return data;
}

export { get };
