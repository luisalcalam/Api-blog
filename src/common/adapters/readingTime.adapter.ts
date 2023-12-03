import { ReadingTime } from '../interfaces/common.interfaces';
const readingTime = require('reading-time');

export class ReadingTimeAdapter {
  static getReadingTime(text: string): ReadingTime {
    return readingTime(text);
  }
}
