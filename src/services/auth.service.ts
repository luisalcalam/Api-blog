import { User } from '../data/postgresql/models/user.model';
import { UserEntity } from '../domain/entities/user.entity';
import { JwtAdapter } from '../common/adapters/jwt.adapter';
import { CustomError } from '../common/utilities/custom.error';
import { bcryptAdapter } from '../common/adapters/bcript.adapter';
import { RegisterUserDto } from '../common/dtos/auth/register-user.dto';
import { dataSourceDB } from '../app';
import { LoginUserDto } from '../common/dtos/auth/login-user.dto';

export class AuthService {
  public async registerUser(registerUserDto: RegisterUserDto) {
    const userRepository = dataSourceDB.getRepository(User);
    console.log(`registerUser service`, { RegisterUserDto });

    const existUser = await userRepository.findOne({
      where: { username: registerUserDto.username },
    });
    console.log({ existUser });
    if (existUser) throw CustomError.badRequest('Username already exist');

    try {
      registerUserDto.password = bcryptAdapter.hash(registerUserDto.password);
      const user = userRepository.create(registerUserDto);

      // Encriptar la contraseña

      await userRepository.save(user);

      const { password, ...userEntity } = UserEntity.fromObject(user);

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
    const userRepository = dataSourceDB.getRepository(User);

    const user = await userRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!user) throw CustomError.badRequest('User not exist');

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!isMatching) throw CustomError.badRequest('Password is not valid');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userEntity,
      token: token,
    };
  }
}
