import axios from "axios";
import {AuthEndpoints} from "enums";

export const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

const skipUrls = [AuthEndpoints.Logout, AuthEndpoints.Login, AuthEndpoints.Refresh] as string[];

instance.interceptors.request.use(async (config) => {

  if (config.url && skipUrls.includes(config.url)) {
    return config
  }

  const accessToken = await localStorage.getItem('token');

  if (accessToken) {
    const authorization = `Bearer ${accessToken}`;
    config.headers = config.headers ?? {}

    config.headers.Authorization = authorization;
  }

  return config
})
