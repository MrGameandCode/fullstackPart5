import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  const request = axios.get(baseUrl, { headers: { 'Authorization': 'bearer ' + token } })
  return request.then(response => response.data)
}

const getByID = (token, id) => {
  const request = axios.get(baseUrl + '/' + id, { headers: { 'Authorization': 'bearer ' + token } })
  return request.then(response => response.data).catch((error) => error)
}

const createBlog = (token, blog) => {
  const request = axios.post(baseUrl, blog, { headers: { 'Authorization': 'bearer ' + token } })
  return request.then(response => response.data).catch((error) => error)
}

const updateBlog = (token, blog, blogId) => {
  const request = axios.put(baseUrl + '/' + blogId, blog, { headers: { 'Authorization': 'bearer ' + token } })
  return request.then(response => response.data).catch((error) => error)
}

export default {
  getAll,
  getByID,
  createBlog,
  updateBlog
}