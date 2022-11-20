import {instance} from "api/instance/instance";
import {User} from "api/users/types";

export class UsersApi {
  static fetchUsers = async () => {
    return instance.get('/users');
  }

  static deleteUsers = async (usersId: string[]) => {
    return await instance.delete('/users', {data: usersId})
  }

  static toggleUsersStatus = async (users: User[]) => {
    return await instance.put('/users', users);
  }
}