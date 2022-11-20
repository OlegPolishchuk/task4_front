import {User} from "api/users/types";

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: User;
}

export interface IRegisterRequest {
  login: string;
  password: string;
  email: string;
}

export interface IRegisterResponse {
  accessToken: string;
}

export interface RejectedResponse {
  message: string;
}

export interface IsLoginExistRequest {
  login: string;
}