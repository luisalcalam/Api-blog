import { CustomError } from '../../common/utilities/custom.error';

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public username: string,
    public password: string,
    public img?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, username, password, img } = object;

    if (!_id && !id) {
      throw CustomError.badRequest('Missing id');
    }

    if (!name) throw CustomError.badRequest('Missing name');
    if (!username) throw CustomError.badRequest('Missing username');
    if (!password) throw CustomError.badRequest('Missing password');

    return new UserEntity(_id || id, name, username, password, img);
  }
}
