import { CustomError } from '../../common/utilities/custom.error';
import { ReadingTimeAdapter } from '../../common/adapters/readingTime.adapter';
import { CreatePublicationDto } from '../dtos/publication/createPublication.dto';
import { Category } from './category';
import { CategoryEntity } from '../../data/postgresql/databaseEntities/category.entity';
import { UserEntity } from '../../data/postgresql/databaseEntities/user.entity';
import { GeneralUtilities } from '../../common/utilities/general.utilities';

export class Publication {
  category?: CategoryEntity;
  author?: UserEntity;
  private constructor(
    public title: string,
    public content: string,
    public imgUrl?: string
  ) {}

  public get slug(): string {
    const slug = `${this.title}${GeneralUtilities.getAleatoryText()}`;
    const normalizedTitle = slug
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    return normalizedTitle;
  }

  public get wordCount(): number {
    return this.content.length;
  }

  get summary(): string {
    return this.content.slice(0, 70);
  }

  get readingTime() {
    return ReadingTimeAdapter.getReadingTime(this.content);
  }

  static fromObject(object: { [key: string]: any } | CreatePublicationDto) {
    const { title, content, imgUrl } = object;

    if (!title) throw CustomError.badRequest('Missing title');
    if (!content) throw CustomError.badRequest('Missing content');

    return new Publication(title, content, imgUrl);
  }
}
