import axios from "axios";

const url = "http://localhost:5000/api/posts";

export const fetchPosts = (page=1) => axios.get(url, { params: { page } });
export const createPost = (newPost) =>
  axios.post(url, newPost, {
    validateStatus: () => true,
    withCredentials: true,
  });
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost, {
    validateStatus: () => true,
    withCredentials: true,
  });
export const deletePost = (id) =>
  axios.delete(`${url}/${id}`, {
    validateStatus: () => true,
    withCredentials: true,
  });
