import { Comics } from 'src/comics/comics.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Es de tipo varchar, unico y no puede ser null
   * @example "Aventuras"
   */
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @OneToMany(() => Comics, (comic) => comic.category)
  @JoinColumn()
  comics: Comics[];
}
