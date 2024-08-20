import { Users } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Chats{
    
    /**
    * uuid v4 generado por la BBDD
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Es el mensaje que se mandan entre usuarios
     * @example "Hola como estas? "
     */
    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
    })
    message: string;

    /**
     * Es la fecha en la que se creo el mensaje
     * @example "1990-07-25"
     */
    @Column()
    created_at: Date;

    /**
     * Es el uuid del usuario que resive el mensaje
     * @example "91d07b4f-0485-4fdf-9eba-2eb0baa3b6c8"
     */
    @Column({
        nullable: false,
    })
    reseptorId: string
    
    @ManyToOne(() => Users, (user) => user.chats)
    @JoinColumn({name: 'user_id'})
    user: Users;


}