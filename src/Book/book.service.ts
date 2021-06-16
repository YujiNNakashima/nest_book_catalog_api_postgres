import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  @Cron('0 30 11 * * 1-5')
  handleCron() {
    this.logger.debug('cron roda de segunda a sexta às 11h30 da manhã');
  }

  async getAllBooks(): Promise<Book[]> {
    try {
      const books = await this.bookRepository.query(`select * from book`)

      if(books.length === 0) {
        throw new HttpException('livros não encontrados', HttpStatus.NOT_FOUND);
      }

      return books

    } catch (error) {
        return error
    } 
  }

  async getBookById(bookId: number): Promise<Book> {
    const book = await this.bookRepository.findOne(bookId)
    
    if(!book) {
      throw new HttpException('livro não encontrado', HttpStatus.NOT_FOUND);
    }

    return book
  }

  async createBook(bookPayload: any): Promise<any> {
    const bookDto = {...bookPayload, date: new Date()}

    try {
      return await this.bookRepository.save(bookDto)
    } catch (error) {
      return error
    }
  }

  async deleteBookById(bookId: string) {
    try {
      return await this.bookRepository.delete(bookId)
    } catch (error) {
      return error
    }
  }
 }
