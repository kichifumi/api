import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { length: 255, nullable: false })
  login_id: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    transformer: {
      to: (raw: string) => bcrypt.hashSync(raw, 10),
      from: (hashed: string) => hashed,
    },
  })
  password: string;

  @Column('varchar', { length: 255, nullable: false })
  first_name: string;

  @Column('varchar', { length: 255, nullable: false })
  last_name: string;

  @Column('varchar', { length: 255, nullable: false })
  first_name_kana: string;

  @Column('varchar', { length: 255, nullable: false })
  last_name_kana: string;

  @Column('tinyint', { width: 1, default: 1 })
  admin_flag: number;

  @Column({ nullable: true })
  refresh_token: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
