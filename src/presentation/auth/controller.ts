import { Request, response, Response } from 'express';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthService } from '../../services/auth.service';
import { CustomError } from '../../common/utilities/custom.error';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  loginUser = async (req: Request, res: Response) => {
    const [errors, loginUserDto] = await LoginUserDto.create(req.body);
    if (errors) return res.status(400).json({ errors });

    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  registerUser = async (req: Request, res: Response) => {
    const [errors, registerDto] = await RegisterUserDto.create(req.body);
    if (errors) return res.status(400).json({ errors });

    this.authService
      .registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
    // res.json({ msg: 'register' });
  };
}
