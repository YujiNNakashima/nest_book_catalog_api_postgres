import {MigrationInterface, QueryRunner} from "typeorm";

export class alterField1623361771315 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" RENAME COLUMN "title" TO "book_title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" RENAME COLUMN "book_title" TO "title"`);
    }

}
