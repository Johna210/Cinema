import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchList } from './watchlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchlistService {
    constructor(@InjectRepository(WatchList) private watchListRepository: Repository<WatchList>){}

    // To create watchlist using the userId and movieId as parameter 
    createWatchList(userId:number,movieId:number){

        const watchList = this.watchListRepository.create({userId,movieId})

        return this.watchListRepository.save(watchList);

    }
}
