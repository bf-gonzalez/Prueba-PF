import { IsDate, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateCommentDto{

    /**
     * Es el uuid del usuario que creo el comentario
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string;
    /**
     * El comentario puede tener un minimo 10 caracteres hasta un maximo de 250 caracteres
     * @example "¡Me encantó el desarrollo de los personajes en este número! El giro de la trama al final fue increíble." 
     */
    @IsNotEmpty({
        message: "El comentario no puede estar vacio"
    })
    @IsString()
    @MinLength(10, {
        message: "El comentario tiene que tener minimo 10 caracteres"
    })
    @MaxLength(250,{
        message: "El comentario no puede exeder los 250 caracteres"
    })
    content: string;

    /**
     * Es la fecha de creacion del comentario
     * @example '1995-07-27'
     */
    @IsNotEmpty()
    @IsDate()
    created_at: Date;
}