import axios from "axios";

const apis = {
  // body로 넣어주기
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
  getPosts: () => axios.get(`http://www.hongsick.com/api/post/`),
  getPostsByUser: (userId) =>
    axios.get(`http://www.hongsick.com/api/search/user/${userId}`),
  getDetailPost: (id) => axios.get(`http://www.hongsick.com/api/post/${id}`),
  forgot: (data) =>
    axios.post("http://www.hongsick.com/api/auth/forgot-password", data),
  reset: (token, data) =>
    axios.post(
      `http://www.hongsick.com/api/auth/reset-password?token=${token}`,
      data
    ),
  comment: (comment, access) =>
    axios.post(`http://www.hongsick.com/api/comment`, comment, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }),
  deleteComment: (commentId, userId, access) =>
    axios.delete(`http://www.hongsick.com/api/comment`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: {
        commentId,
        userId,
      },
    }),
  searchByTag: (id) =>
    axios.get(`http://www.hongsick.com/api/search/tag/${id}`),
  searchByTagName: (name) =>
    axios.get(`http://www.hongsick.com/api/search/tag/`, {
      params: { name },
    }),
  likes: (postId, userId, access) =>
    axios.post(
      `http://www.hongsick.com/api/like/`,
      {
        postId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    ),
  unlikes: (postId, userId, access) =>
    axios.delete(`http://www.hongsick.com/api/like/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: {
        postId,
        userId,
      },
    }),
  deletepost: (postId, access) =>
    axios.delete(`http://www.hongsick.com/api/post`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: {
        postId,
      },
    }),
};

export default apis;
