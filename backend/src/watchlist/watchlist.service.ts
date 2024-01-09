import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchList } from './watchlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchlistService {
    constructor(@InjectRepository(WatchList) private watchListRepository: Repository<WatchList>){}
}
