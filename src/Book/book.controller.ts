import { Body, CacheInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  validate,
} from 'class-validator';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CheckBodyDTO } from '../book/dto/check-validation-pipe';
import { ValidationPipe } from '../validator/validator.pipe';
import { RolesGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';

@Controller('books')
@UseGuards(RolesGuard, AuthGuard)
@UseInterceptors(CacheInterceptor)
export class BookController {
  counter = 0

  constructor(private readonly bookService: BookService) {}
  
  @Get('/counter')
  getCache(): number | string {
    const res = this.counter++
    console.log(this.counter)
    return JSON.stringify(res)
  }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }

  @Get(":bookId")
  async getBookById(@Param('bookId', ParseIntPipe) bookId: number): Promise<Book> {
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
