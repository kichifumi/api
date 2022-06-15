import {MigrationInterface, QueryRunner} from "typeorm";

export class createTask1655304878556 implements MigrationInterface {
    name = 'createTask1655304878556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshtoken\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshtokenexp\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshtokenexp\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshtoken\` varchar(255) NULL`);
    }

}
