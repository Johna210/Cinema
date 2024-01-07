import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from './cinema.entity';

@Injectable()
export class CinemasService {
  constructor(@InjectRepository(Cinema) private repo: Repository<Cinema>) {}

  create(
    cinemaName: string,
    email: string,
    password: string,
    description: string,
  ) {
    const cinema = this.repo.create({
      cinemaName,
      email,
      password,
      description,
    });

    return this.repo.save(cinema);
  }

  findOne() {}

  findEmail() {}

  findCinemaName() {}

  update() {}

  remove() {}

  addMovie() {}

  updateMovie() {}

  removeMovie() {}
}
