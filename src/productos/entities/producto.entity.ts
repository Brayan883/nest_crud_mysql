import { Categoria } from "../../categorias/entities/categoria.entity";
import { User } from "../../users/entities/user.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("productos")
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: "int", precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.id, {
    eager: true,
  })
  categoria: Categoria;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_Email", referencedColumnName: "email" })
  user: User;

  @Column()
  user_Email: string;
}
