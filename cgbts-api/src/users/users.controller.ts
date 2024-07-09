import { Controller, Get, Post, Body, Query, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserInfoDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('/updateUser')
  updateUser(
    @Query('userid') user: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+user, updateUserDto);
  }

  @Post('/saveMoreInfo')
  saveInfo(@Body() createUserDto: CreateUserInfoDto) {
    return this.usersService.saveMoreInfo(createUserDto);
  }
}
