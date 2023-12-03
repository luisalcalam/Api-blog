import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CustomError } from '../common/utilities/custom.error';
import { DeepPartial } from '../common/types/common.types';
import {
  CustomResponse,
  Pagination,
} from '../common/interfaces/common.interfaces';
import { PaginationDto } from '../common/dtos/pagination.dto';

export abstract class GenericService<
  ENTITY extends Record<string, any>,
  ID extends string | number
> {
  private readonly genericRepository: Repository<ENTITY>;
  private label: string;

  constructor(genericRepository: Repository<ENTITY>, label = 'el registro') {
    this.genericRepository = genericRepository;
    this.label = label;
  }

  async create(data: DeepPartial<ENTITY>): Promise<ENTITY> {
    try {
      // const d: DeepPartial<ENENTITYIENTITYY> = {};
      const newItem = this.genericRepository.create(data);
      await this.genericRepository.save(newItem);
      return newItem;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal error');
    }
  }

  async update(id: ID, data: DeepPartial<ENTITY>): Promise<ENTITY> {
    try {
      console.log(id, data);
      const options: FindOptionsWhere<ENTITY> = {
        id,
      } as unknown as FindOptionsWhere<ENTITY>;
      const item = await this.genericRepository.findOneBy(options);
      if (!item) {
        throw CustomError.notFound(`No se encontro ${this.label}`);
      }
      this.genericRepository.merge(item, data);
      return this.genericRepository.save(item);
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal error');
    }
  }

  async delete(id: ID): Promise<boolean> {
    try {
      await this.genericRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal error');
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const deleteResponse = await this.genericRepository.softDelete(id);
      if (!deleteResponse.affected) {
        throw CustomError.notFound(`No se encontro ${this.label}`);
      }
      return true;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal error');
    }
  }

  async findAll(
    paginationDto: PaginationDto,
    where = {}
  ): Promise<CustomResponse<ENTITY[]>> {
    try {
      let skip;
      if (!paginationDto.skip) {
        skip = (paginationDto.currentPage - 1) * paginationDto.perPage;
      } else {
        skip = paginationDto.skip;
      }
      const { perPage, currentPage } = paginationDto;
      const data = await this.genericRepository.findAndCount({
        where,
        skip,
        take: perPage,
      });
      const totalPages = Math.ceil(data[1] / perPage);
      const pagination: Pagination = {
        perPage,
        currentPage,
        totalPages,
        totalRows: data[1],
      };
      return {
        content: data[0],
        pagination,
      };
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal error');
    }
  }

  async findOne(id: ID): Promise<CustomResponse<ENTITY>> {
    try {
      const options: FindOptionsWhere<ENTITY> = {
        where: { id },
      } as unknown as FindOptionsWhere<ENTITY>;
      const item = await this.genericRepository.findOne(options);
      if (!item) {
        throw CustomError.notFound(`No se encontro ${this.label}`);
      }
      const res: CustomResponse<ENTITY> = {
        content: item,
      };
      return res;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer('Internal error');
    }
  }
}
