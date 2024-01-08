import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { MoviesModule } from './movies/movies.module';
import { User } from './users/user.entity';
import { Cinema } from './cinemas/cinema.entity';
import { UserauthModule } from './auth/userauth/userauth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cinema.sqlite',
      entities: [User, Cinema],
      synchronize: true,
    }),
    UsersModule,
    CinemasModule,
    MoviesModule,
    UserauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
