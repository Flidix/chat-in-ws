import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTOGroupEntity1691513185653 implements MigrationInterface {
    name = 'CreateUserTOGroupEntity1691513185653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-to-groups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_18abb2ca9df1ce3797f1b0ceb6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user-to-groups" ADD CONSTRAINT "FK_8cf5d123984aace16e1e9c55d7c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-to-groups" ADD CONSTRAINT "FK_24af16c2c7278317379448c647e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-to-groups" DROP CONSTRAINT "FK_24af16c2c7278317379448c647e"`);
        await queryRunner.query(`ALTER TABLE "user-to-groups" DROP CONSTRAINT "FK_8cf5d123984aace16e1e9c55d7c"`);
        await queryRunner.query(`DROP TABLE "user-to-groups"`);
    }

}
