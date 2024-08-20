import { Comics } from "src/comics/comics.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Comments {

    /**
    * uuid v4 generado por la BBDD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
    *Es de tipo texto y contiene algun comentario relacionado a los comic o a su creador
    * @example "¡Me encantó el desarrollo de los personajes en este número! El giro de la trama al final fue increíble." 
    */
    @Column({
        type: 'text',
        nullable: false,
        
    })
    content: string;

    /**
     * Es la fecha de cuando se creo el comentario
     * @example "1990-07-25"
     */
    @Column()
    created_at: Date;

    @ManyToOne(() => Users, (user) => user.comments)
    @JoinColumn({name: 'user_id'})
    user: Users;


    @ManyToOne(() => Comics, (comic) => comic.comment)
    comic: Comics;

}

