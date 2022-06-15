import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1654930850122 implements MigrationInterface {
    name = 'createUser1654930850122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login_id\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`first_name_kana\` varchar(255) NOT NULL, \`last_name_kana\` varchar(255) NOT NULL, \`admin_flag\` tinyint(1) NOT NULL DEFAULT '1', \`refreshtoken\` varchar(255) NULL, \`refreshtokenexp\` date NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
