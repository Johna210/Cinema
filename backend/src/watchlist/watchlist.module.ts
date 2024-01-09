import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchList } from './watchlist.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WatchList])],
  controllers: [WatchlistController],
  providers: [WatchlistService],
  exports:[WatchlistService]
})
export class WatchlistModule {}
