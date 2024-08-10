import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {

  /**
   * Es de tipo uuid.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Es el nombre del evento.
   * @example "EsportComic"
   */
  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  eventName: string;

  /**
   * Es la descripcion del evento sus caracteristicas entre otras
   * @example "Este evento esta destinado a que los amantes del comic se conozcan"
   */
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  /**
   * Es la imagen del poster puede ser una url
   * @example "https://res.cloudinary.com/dyeji7bvg/image/upload/v1720248068/uhzzius1h9lbjc8k3hd9.webp"
   */
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  img: string;

  /**
   * Es la fecha del evemto
   * @example "1990-07-25"
   */
  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  /**
   * Es el precio del evento es de tipo number hasta 2 decimales 
   * @example "49.99"
   */
  @Column({
    type: 'decimal',
    scale: 2,
    nullable: false,
  })
  price: number;

  /**
   * Es el lugar en donde va a ser el evento
   * @example "calle falsa 123 Argentina"
   */
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  location: string;
}
