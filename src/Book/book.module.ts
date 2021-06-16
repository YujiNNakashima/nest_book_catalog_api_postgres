import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './Book.service';
import { BookController } from './Book.controller';
import { Book } from './book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    CacheModule.register()
],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}