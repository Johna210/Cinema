import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movies) private moviesRepository: Repository<Movies>){}
    

    //for Creating movies
    async createMovies(title:string,genre:string,day:string,showTime:string,imageUrl:string,cinemaId:number){
        const newmovie = this.moviesRepository.create({
            title,
            genre,
            day,
            showTime,
            imageUrl,
            cinemaId})
            
        return this.moviesRepository.save(newmovie)
       }

}
