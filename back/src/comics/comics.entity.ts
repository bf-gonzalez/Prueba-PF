import { Categories } from 'src/categories/categories.entity';
import { Comments } from 'src/comment/comment.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
   * @example "Marvel"
   */
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  title: string;

  /**
   * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
   * @example "Este comic tiene mucha accion, peleas y cuanta con un gran gion"
   */
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  description: string;

  /**
   * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
   * @example "Batman"
   */
  @Column({
    type: 'varchar',
    length: 25,
    unique: false,
    nullable: false,
  })
  author: string;

  /**
   * Es la categoria que le da el usuario al crear su comic
   * @example "Aventura"
   */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  categoryname: string;

  /**
   * Es el tipo de comic ya sea manga,occidental,etc
   * @example "Manga"
   */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  typecomic: string;

  /**
   * Es el idioma del comic Ej. ingles,español,etc
   * @example "Ingles"
   */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  idioma: string

  /**
   * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
   * @example "1990-07-25"
   */
  @Column({
    type: 'date',
    nullable: false,
  })
  data_post: Date;

  /**
   * Es de tipo text y tiene que ser una URL
   * @example "https://res.cloudinary.com/dyeji7bvg/image/upload/v1720248068/uhzzius1h9lbjc8k3hd9.webp"
   */
  @Column({
    type: 'varchar',
    nullable: false,
  })
  folderName: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @ManyToOne(() => Users, (user) => user.comics, {
    eager: true,
    nullable: false,
  })
  user: Users;

  @ManyToOne(() => Categories, (category) => category.comics)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @OneToMany(() => Comments, (comment) => comment.comic)
  comment: Comments[];
}
