import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    // private readonly userService: UserService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    
    return await this.authService.signIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.singUp(user);
  }
}
