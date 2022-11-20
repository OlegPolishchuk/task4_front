import {ILoginRequest, IRegisterRequest, IsLoginExistRequest} from "api/auth/types";
import {instance} from "api/instance/instance";
import {AuthEndpoints} from "enums";


export class AuthApi {

  static login = async (params: ILoginRequest) => {
    return await instance.post(AuthEndpoints.Login, params)
  }

  static register = async (params: IRegisterRequest) => {
    return await instance.post(AuthEndpoints.Register, params)
  }

  static logout = async () => {
    return await instance.get(AuthEndpoints.Logout)
  }

  static getMe = async () => {
    return await instance.get(AuthEndpoints.Me)
  }

  static refreshToken = async () => {
    return await instance.get(AuthEndpoints.Refresh)
  }

  static checkIsLoginAlreadyExist = async (login: IsLoginExistRequest) => {
    return await instance.post(AuthEndpoints.IsLoginExist, login)
  }
}

