export class User {
  constructor (
    private token: string,
    public login: string,
    public password_ver: string,
    public password: string,
    public username: string,
    public email: string,
    public agreement: boolean
  ){ }
}