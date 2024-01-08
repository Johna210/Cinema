import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../Interceptors/serialize.iterceptor';
import { UserDto } from './dtos/user.dto';
import { signinUserDto } from './dtos/signin-user.dto';
import { JwtAuthGuard } from 'src/auth/userauth/guards/jwt-userAuth.guard';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  whoAmI(@Request() req) {
    console.log(req.user);
    return req.user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(
      body.fullname,
      body.email,
      body.username,
      body.password,
    );

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: signinUserDto) {
    const user = await this.usersService.login(body.email, body.password);
    return user;
  }

  // @Get('/:id')
  // async findUser(@Param('id') id: string) {
  //   const user = await this.usersService.findOne(parseInt(id));
  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }
  //   return user;
  // }

  // @Get()
  // UsersWithEmail(@Query('email') email: string) {
  //   return this.usersService.findEmail(email);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete('/delaccount')
  removeUser(@Request() req) {
    console.log(req.user);
    return this.usersService.remove(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit')
  updateUser(@Request() req, @Body() body: UpdateUserDto) {
    const user = req.user;
    return this.usersService.update(parseInt(user.sub), body);
  }
}
