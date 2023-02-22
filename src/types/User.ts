interface User {
  id?: number;
  uuid?: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export default User;