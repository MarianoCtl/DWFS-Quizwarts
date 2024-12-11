import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants';

@Module({
  imports: [
    forwardRef(() => UsuariosModule), // Usar forwardRef para evitar circularidad
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})

export class AuthModule {}