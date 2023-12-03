import { UserEntity } from '../data/postgresql/databaseEntities/user.entity';
import { User } from '../domain/entities/user';
import { JwtAdapter } from '../common/adapters/jwt.adapter';
import { CustomError } from '../common/utilities/custom.error';
import { bcryptAdapter } from '../common/adapters/bcript.adapter';
import { RegisterUserDto } from '../domain/dtos/auth/register-user.dto';
import { dataSourceDB } from '../app';
import { LoginUserDto } from '../domain/dtos/auth/login-user.dto';

export class AuthService {
  public async registerUser(registerUserDto: RegisterUserDto) {
    const userRepository = dataSourceDB.getRepository(UserEntity);
    console.log(`registerUser service`, { RegisterUserDto });

    const existUser = await userRepository.findOne({
      where: { username: registerUserDto.username },
    });
    console.log({ existUser });
    if (existUser) throw CustomError.badRequest('Username already exist');

    try {
      registerUserDto.password = bcryptAdapter.hash(
        registerUserDto.password as string
      );
      const user = userRepository.create(registerUserDto);

      // Encriptar la contraseña

      await userRepository.save(user);

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
    const userRepository = dataSourceDB.getRepository(UserEntity);

    const user = await userRepository.findOne({
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
