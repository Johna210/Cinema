import { Module } from '@nestjs/common';
import { CinemasController } from './cinemas.controller';
import { CinemasService } from './cinemas.service';
import { Cinema } from './cinema.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaAuthService } from '../auth/cinema-auth/cinema-auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema])],
  controllers: [CinemasController],
  providers: [CinemasService, CinemaAuthService],
})
export class CinemasModule {}
