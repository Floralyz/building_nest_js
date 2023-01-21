import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
        ){}

        @Post('signin')
        signIn(@Body(ValidationPipe) authCredentials: authCredentialsDto): Promise <{accessToken: string}> {
            return this.authService.signIn(authCredentials);
        }


        @Post('/signup')
        signUp(@Body(ValidationPipe) authcredentials: authCredentialsDto): Promise<void>{
            return this.authService.signUp(authcredentials);
        }

        @Post('/test')
        @UseGuards(AuthGuard())
        authTest(@GetUser() user) {
            console.log('user',user);
        }
}
