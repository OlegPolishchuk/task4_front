import {AxiosError} from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response?.data) {
    return error.response.data
  }

  return error.message;
}