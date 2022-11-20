export interface User {
  login: string;
  password: string;
  email: string;
  status: string;
  __v: number;
  _id: string;
  created_at: string;
  updated_at: string;
  lastLogin: Date;
  created: Date;
  checked: boolean;
}

export interface UsersResponse {
  users: User[];
}