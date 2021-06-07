import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    try {
      return await this.bookRepository.find()    
    } catch (error) {
      return error
    }
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
