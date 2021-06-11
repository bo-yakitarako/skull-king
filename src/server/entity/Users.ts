/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  userId: number;

  @Column({ type: 'varchar', length: 256 })
  // @ts-ignore
  userName: string;

  @CreateDateColumn()
  // @ts-ignore
  createdAt: string;

  @UpdateDateColumn()
  // @ts-ignore
  updatedAt: string;
}

export { Users };
