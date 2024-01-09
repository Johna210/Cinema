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

@Module({
  imports: [TypeOrmModule.forFeature([User]), WatchlistModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserauthService,
    JwtService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class UsersModule {}
