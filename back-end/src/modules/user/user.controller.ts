import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserRegisterDto } from './dto/userRegister.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('/register')
  register(@Body() userData: UserRegisterDto) {
    return this.userService.register.execute(userData);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user information' })
  @ApiResponse({
    status: 200,
    description: 'User information successfully updated',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put('/update')
  update(@Body() userData: UserUpdateDto, @Req() request: Request) {
    const userId = request['user'].sub;
    return this.userService.update.execute(userData, userId);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get user data' })
  @ApiResponse({ status: 200, description: 'User data successfully retrieved' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('/')
  findById(@Req() request: Request) {
    const userId = request['user'].sub;
    return this.userService.findUserById.execute(userId);
  }
}
