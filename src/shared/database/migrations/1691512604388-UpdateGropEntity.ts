import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGropEntity1691512604388 implements MigrationInterface {
    name = 'UpdateGropEntity1691512604388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "groupId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "groupId"`);
    }

}
