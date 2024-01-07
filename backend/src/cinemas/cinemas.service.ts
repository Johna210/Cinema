import { Injectable, UploadedFile } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from './cinema.entity';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CinemasService {
  constructor(@InjectRepository(Cinema) private repo: Repository<Cinema>) {}

  create(
    cinemaName: string,
    email: string,
    password: string,
    description: string,
    imagePath: string,
  ) {
    const cinema = this.repo.create({
      cinemaName,
      email,
      password,
      description,
      imagePath,
    });

    return this.repo.save(cinema);
  }

  //   async uploadImage(image: Express.Multer.File, cinemaid: number) {
  //     const uniqueFilename = `${cinemaid}.jpg`;
  //     const destination = '../images/cinemaProfiles';

  //     diskStorage({
  //         destination,
  //         filename: ()
  //     })
  //   }

  findOne() {}

  findEmail() {}

  findCinemaName() {}

  update() {}

  updateImage() {}

  remove() {}

  addMovie() {}

  updateMovie() {}

  removeMovie() {}
}
