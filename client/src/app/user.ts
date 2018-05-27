export class User {
  constructor (
    private token: string,
    public login: string,
    public password: string
  ){ }
}