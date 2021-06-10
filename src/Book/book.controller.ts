import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  validate,
  validateOrReject,
} from 'class-validator';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CheckBodyDTO } from '../book/dto/check-validation-pipe';
import { ValidationPipe } from '../validator/validator.pipe';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }

  @Get(":bookId")
  async getBookById(@Param('bookId', ParseIntPipe) bookId: number): Promise<Book> {
    console.log(typeof bookId)
    return await this.bookService.getBookById(bookId);
  }

  @Post()
  async createBook(@Body() bookPayload): Promise<void> {
    return await this.bookService.createBook(bookPayload)
  }

  @Delete(':bookId')
  async deleteBookById(@Param('bookId') bookId: string): Promise<void> {
    return await this.bookService.deleteBookById(bookId)
  }

  @Post('/checkall')
  async checkBodyValidationPipes(@Body(new ValidationPipe()) body: CheckBodyDTO) {
    
    try {
      await validate(body)
      return {isValidated: true};

    } catch (error) {
      return error
    }
  }
  
}
