import { Controller, Post, Body } from '@nestjs/common';
import { CreateCinemaDto } from './dtos/create-cinema.dto';
import { CinemasService } from './cinemas.service';

@Controller('cinemas')
export class CinemasController {
  constructor(private cinemasService: CinemasService) {}

  @Post('/signup')
  async createCinema(@Body() body: CreateCinemaDto) {
    this.cinemasService.create(
      body.cinemaName,
      body.email,
      body.password,
      body.description,
    );
  }
}
