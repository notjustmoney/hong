import axios from "axios";

const apis = {
  authMe: (userId, access) =>
    axios.get(`http://www.hongsick.com/api/auth/me/${userId}`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }),
  refreshToken: (refresh) =>
    axios.post(`http://www.hongsick.com/api/auth/refresh-tokens`, {
      refreshToken: refresh,
    }),
  login: (info) => axios.post("http://www.hongsick.com/api/auth/login", info),
  register: (data) =>
    axios.post("http://www.hongsick.com/api/auth/register", data),
  getPosts: () => axios.get(`http://localhost:3030/post/`),
  getDetailPost: (id) => axios.get(`http://www.hongsick.com/api/post/${id}`),
  forgot: (data) =>
    axios.post("http://www.hongsick.com/api/auth/forgot-password", data),
  reset: (token, data) =>
    axios.post(
      `http://www.hongsick.com/api/auth/reset-password?token=${token}`,
      data
    ),
  searchByTag: (id) => axios.get(`http://www.hongsick.com/api/search/${id}`),
};

export default apis;
