import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '../test/test.utils';


describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;
  let repositoryMock: MockType<Repository<Book>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        { provide: getRepositoryToken(Book), useFactory: repositoryMockFactory },
      ],
    }).compile();

    bookController = app.get<BookController>(BookController);
    bookService = app.get<BookService>(BookService);
    repositoryMock = app.get(getRepositoryToken(Book));

  });

  describe('root', () => {
    it('should return books', async () => {

      const date = new Date()
      const res = [{'title': 'oi', 'author': 'mishima', 'id': 1, 'date': date}]
      repositoryMock.find.mockReturnValueOnce(res)
      jest.spyOn(bookService, 'getAllBooks')
        .mockResolvedValue(res)

      expect(await bookController.getAllBooks()).toBe(res);
    });
  });
});