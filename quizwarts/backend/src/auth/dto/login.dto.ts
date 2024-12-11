import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    username: string;
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    password: string;
}