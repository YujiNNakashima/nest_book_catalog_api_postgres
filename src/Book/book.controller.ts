import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() bookPayload): any {
    return this.bookService.createBook(bookPayload)
  }

  @Delete(':bookId')
  deleteBookById(@Param('bookId') bookId: string) {
    return this.bookService.deleteBookById(bookId)
  }
  
}
