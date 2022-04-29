import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { AUTHOR_ALREADY_EXISTS, AUTHOR_NOT_FOUND } from '../errors/authors.error';
import { CreateAuthorDto } from '../dto/create/create-author.dto';
import { FORMAT } from '../configs/date.config';
import * as moment from 'moment';
import { UpdateAuthorDto } from '../dto/update/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(Author) private authorsRepository: Repository<Author>) {}

  async getAll() {
    return await this.authorsRepository.find();
  }

  async getById(id: number) {
    const author = await this.authorsRepository.findOne({where: {id}});
    if (!author) throw new HttpException(AUTHOR_NOT_FOUND, HttpStatus.NOT_FOUND);

    return author;
  }

  async create(dto: CreateAuthorDto) {
    const isExists = await this.authorsRepository.findOne({
      where: {
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
      }
    });

    if (isExists) throw new HttpException(AUTHOR_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);

    const author = {
      ...dto,
      dateOfBirth: moment(dto.dateOfBirth).format(FORMAT),
      dateOfDeath: moment(dto.dateOfDeath).format(FORMAT),
    };
    return await this.authorsRepository.save(author);

  }

  async update(id: number, dto: UpdateAuthorDto) {
    await this.checkExists(id);
    return await this.authorsRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.checkExists(id);
    return await this.authorsRepository.delete(id);
  }

  private async checkExists(id: number) {
    const author = await this.authorsRepository.findOne({ where: { id } });
    if (!author) throw new HttpException(AUTHOR_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
