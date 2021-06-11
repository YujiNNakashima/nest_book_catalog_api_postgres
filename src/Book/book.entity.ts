import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_title: string;

  @Column()
  author: string;

  @Column()
  date: Date;

}