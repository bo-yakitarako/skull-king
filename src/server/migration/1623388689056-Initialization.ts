import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialization1623388689056 implements MigrationInterface {
    name = 'Initialization1623388689056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scores" ("scoreId" SERIAL NOT NULL, "userId" integer NOT NULL, "battleIndex" integer NOT NULL, "score" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d563c2077a7c9443ed54172283" PRIMARY KEY ("scoreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c0508b319d67f890b411809968" ON "scores" ("userId") `);
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "userName" character varying(256) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "IDX_c0508b319d67f890b411809968"`);
        await queryRunner.query(`DROP TABLE "scores"`);
    }

}
