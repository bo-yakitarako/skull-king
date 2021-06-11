/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
class Scores {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  scoreId: number;

  @Index()
  @Column({ type: 'integer' })
  // @ts-ignore
  userId: number;

  @Column({ type: 'integer' })
  // @ts-ignore
  battleIndex: number;

  @Column({ type: 'integer' })
  // @ts-ignore
  score: number;

  @CreateDateColumn()
  // @ts-ignore
  createdAt: string;

  @UpdateDateColumn()
  // @ts-ignore
  updatedAt: string;
}

export { Scores };
