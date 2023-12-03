import { UserEntity } from '../data/postgresql/databaseEntities/user.entity';
import { User } from '../domain/entities/user';
import { JwtAdapter } from '../common/adapters/jwt.adapter';
import { CustomError } from '../common/utilities/custom.error';
import { bcryptAdapter } from '../common/adapters/bcript.adapter';
import { RegisterUserDto } from '../domain/dtos/auth/register-user.dto';
import { dataSourceDB } from '../app';
import { LoginUserDto } from '../domain/dtos/auth/login-user.dto';
import { GenericService } from './generic.service';
import { Repository } from 'typeorm';

export class AuthService extends GenericService<UserEntity, string> {
  constructor(private userRepo: Repository<UserEntity>) {
    super(userRepo, 'el autor');
  }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await this.userRepo.findOne({
      where: { username: registerUserDto.username },
    });
    if (existUser) throw CustomError.badRequest('Username already exist');

    try {
      registerUserDto.password = bcryptAdapter.hash(
        registerUserDto.password as string
      );
      const user = await super.create(registerUserDto);

      const { password, ...userEntity } = User.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepo.findOne({
      where: { username: loginUserDto.username },
    });
    if (!user) throw CustomError.badRequest('User not exist');

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password as string,
      user.password
    );
    if (!isMatching) throw CustomError.badRequest('Password is not valid');

    const { password, ...userEntity } = User.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token: token,
    };
  }
}
