import axios from "axios"

const baseURL = "https://www.googleapis.com/books/v1/volumes"
const apiKey = "AIzaSyDPMe25mBORda_PoruraGIli271SN79Iyo"

export const bookListRequest = axios.create({
  baseURL,
})

bookListRequest.interceptors.request.use(config => {
  config.url += `&key=${apiKey}`
  return config
})

export const singleBookRequest = axios.create({
  baseURL,
})

singleBookRequest.interceptors.request.use(config => {
  config.url += `?key=${apiKey}`
  return config
})
