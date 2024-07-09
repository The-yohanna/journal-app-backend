import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Logins a user.' })
  @ApiOkResponse({
    description: 'User successfully signed in.',
  })
  @Post('login')
  signIn(@Body() credentials: CreateUserDto) {
    return this.authService.signIn(credentials.username, credentials.password);
  }

  @ApiOperation({ summary: 'Registers a new user.' })
  @ApiOkResponse({
    description: 'User successfully registered.',
  })
  @Post('register')
  signUp(@Body() newUser: CreateUserDto) {
    return this.authService.signUp(newUser);
  }
}
