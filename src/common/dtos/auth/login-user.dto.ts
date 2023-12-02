export class LoginUserDto {
  private constructor(public username: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { username, password } = object;

    // if ( !name ) return ['Missing name'];
    // if ( !email ) return ['Missing email'];
    // if ( !regularExps.email.test( email ) ) return ['Email is not valid'];
    // if ( !password ) return ['Missing password'];
    // if ( password.length < 6 ) return ['Password too short'];

    return [undefined, new LoginUserDto(username, password)];
  }
}
