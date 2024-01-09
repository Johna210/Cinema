import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './movies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movies) private moviesRepository: Repository<Movies>){}
    
}
