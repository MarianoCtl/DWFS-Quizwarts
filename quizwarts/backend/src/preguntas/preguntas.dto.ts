import { IsInt, IsString, MaxLength, Min, Max} from 'class-validator';

export class PreguntasDto{
    @IsString()
    @MaxLength(100)
    pregunta: string;

    @IsInt()
    @Min(1)
    @Max(3)
    dificultad: number;
}