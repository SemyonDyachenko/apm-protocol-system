import axios from "axios"

export const $api = axios.create({
  baseURL: "http://213.171.8.93/api/",
  withCredentials: true,
})

export const SERVER_URL = "http://213.171.8.93/api"
