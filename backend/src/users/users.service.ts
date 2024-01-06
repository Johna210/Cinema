import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(fullname: string, email: string, username: string, password: string) {
    const user = this.repo.create({ fullname, email, username, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }

    const user = await this.repo.findOneBy({
      id: id,
    });

    return user;
  }

  async findEmail(email: string) {
    const users = await this.repo.find({
      where: { email: email },
    });

    return users;
  }

  async findUsername(username: string) {
    const users = await this.repo.find({
      where: { username: username },
    });

    return users;
  }

  //   attrs short for attributes
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    // Takes all the values of attrs and copy them directly to users
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }
}
