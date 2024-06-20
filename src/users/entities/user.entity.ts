import { Role } from "../../common/enums/role.enum";

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: "enum",  default: Role.USER, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;
}
