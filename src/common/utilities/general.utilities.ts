import { Index } from 'typeorm';

export class GeneralUtilities {
  static getAleatoryText(limit: number = 4): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';

    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * characters.length);
      text += characters.charAt(index);
    }

    return text;
  }
}
