export class User {
  constructor (
    public email: string,
    public password: string,
    public username?: string,
    private token?: string,
  ){ }
  get_token() {
    return this.token;
  }
}