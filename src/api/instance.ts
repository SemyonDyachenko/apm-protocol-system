import axios from "axios"

const PRODUCTION_URL = "https://apm-tech.ru/api/"
const BASE_URL = "http://127.0.0.1:8000/api/"

export const $api = axios.create({
  baseURL: BASE_URL,
})

export const DEBUG = true
export const SERVER_URL = DEBUG
  ? "http://127.0.0.1:8000/api"
  : "https://apm-tech.ru/api"
