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
    // returns the userId from the database and this will be used to get watchlist by userID
    getUserId(userId:number){
        return this.watchListRepository.find({where:{userId}})
    }

    // returns the movieIs form the database and this will be used to remove watchlist by movesId 
    getMovieId(movieId:number){
        return this.watchListRepository.find({where:{movieId}})
    }
}
