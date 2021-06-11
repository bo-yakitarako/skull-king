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

async function get<Res, Req>(path: string, params = {} as Req) {
  const { data } = await axios.get<Res>(path, {
    method: 'get',
    params,
  });
  return data;
}

async function post<Res, Req>(path: string, params = {} as Req) {
  const { data } = await axios.post<Res>(path, {
    method: 'post',
    params,
  });
  return data;
}

export { get, post };
