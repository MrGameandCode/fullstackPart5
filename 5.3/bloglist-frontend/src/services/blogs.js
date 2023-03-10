import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  const request = axios.get(baseUrl, { headers: { 'Authorization': 'bearer ' + token } })
  return request.then(response => response.data)
}

const createBlog = (token, blog) => {
  const request = axios.post(baseUrl, blog, { headers: { 'Authorization': 'bearer ' + token } })
  return request.then(response => response.data)
}

export default {
  getAll,
  createBlog
}