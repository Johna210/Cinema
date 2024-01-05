import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, CinemasModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
