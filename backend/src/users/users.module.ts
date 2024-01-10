import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { UserauthService } from 'src/auth/userauth/userauth.service';
import { JwtService } from '@nestjs/jwt';
import { WatchlistModule } from 'src/watchlist/watchlist.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WatchlistModule, MoviesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserauthService,
    JwtService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class UsersModule {}
