import { Controller, Get, Post, Body, Query, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ChangeUserPasswordDto,
  CreateUserDto,
  CreateUserInfoDto,
  SaveSecurityQDto,
} from './dto/create-user.dto';
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

  @Get('/securityQuestions')
  securityQuestions() {
    return this.usersService.securityQuestions();
  }

  @Post('/saveSecurityQ')
  saveSecurityQuestion(@Body() saveSecurityQDto: SaveSecurityQDto) {
    return this.usersService.saveSecQuestions(saveSecurityQDto);
  }

  @Get('/userDetails')
  userDetails(@Query('userid') user: number) {
    return this.usersService.userDetails(user);
  }

  @Post('/updatePasswordUser')
  updateUserPaswword(@Body() changeUserPasswordDto: ChangeUserPasswordDto) {
    return this.usersService.changePassword(changeUserPasswordDto);
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
