import { IsString } from "class-validator";
export class CreateMovieDto{
    @IsString()
    title: string;
    @IsString()
    genre: string;
    @IsString()
    day: string;
    @IsString()
    showTime: string;
    @IsString()
    imageUrl: string;
}