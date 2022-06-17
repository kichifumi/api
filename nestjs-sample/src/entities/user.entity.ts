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
  username: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    transformer: {
      to: (raw: string) => bcrypt.hashSync(raw, 10),
      from: (hashed: string) => hashed,
    },
  })
  password: string;

  @Column({ nullable: true })
  refresh_token: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
