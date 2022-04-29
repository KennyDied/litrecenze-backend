import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './book.entity';
import { AuthorsService } from '../authors/authors.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private authorsService: AuthorsService,
  ) {}

  async getById(id: number) {
    return await this.booksRepository.findOne({ where: {id} });
  }

  async create({ authorId, ...dto }: CreateBookDto) {
    const author = await this.authorsService.getById(authorId);
    const book = this.booksRepository.create(dto);
    book.author = author;

    return await this.booksRepository.save(book);
  }

  async getAll(dto: SearchBookDto) {
    const search = Object.entries(dto).filter(([,value]) => value).reduce((a, [key, value]) => {
      if (key === 'authorId') return { ...a, ['author']:{id: value} };
      if (typeof value === 'string') return { ...a, [key]: Like(`%${value}%`) }
      return { ...a, [key]: value };
    }, {});
    return await this.booksRepository.find({
      where: { ...search },
      relations: ['author']});
  }

  async delete(id: number) {
    return await this.booksRepository.delete(id);
  }

  async update(id: number, dto: UpdateBookDto) {
    return await this.booksRepository.update(id, dto);
  }
}
