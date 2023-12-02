import jwt from 'jsonwebtoken';
import { envs } from '../../config/envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  // DI?

  static async generateToken(
    payload: any,
    duration: string = '24h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err && token) return resolve(null);

        resolve(token as string);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
