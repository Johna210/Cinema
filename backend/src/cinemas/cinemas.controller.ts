import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { CreateCinemaDto } from './dtos/create-cinema.dto';
import { CinemasService } from './cinemas.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cinemas')
export class CinemasController {
  constructor(private cinemasService: CinemasService) {}

  @Post('/signup')
  async createCinema(@Body() body: CreateCinemaDto) {
    const cinema = await this.cinemasService.create(
      body.cinemaName,
      body.email,
      body.password,
      body.description,
      body.imagePath,
    );

    return cinema;
  }
}
