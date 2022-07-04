import axios from "axios"

const baseURL = "https://www.googleapis.com/books/v1/volumes"
const apiKEY = "AIzaSyDPMe25mBORda_PoruraGIli271SN79Iyo"

export const bookListRequest = axios.create({
  baseURL,
})

bookListRequest.interceptors.request.use(config => {
  config.url += `&key=${apiKEY}`
  return config
})
