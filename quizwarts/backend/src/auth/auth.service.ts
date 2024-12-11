import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
      private readonly usuarioService: UsuariosService,
      private readonly jwtService: JwtService
    ) { }

    async login(loginDto:LoginDto){
        const user = await this.usuarioService.getUsuarioPorMail(loginDto.username);        
    
        if(!await bcrypt.compare(loginDto.password, user.password)){
          throw new UnauthorizedException(); 
        }
        const payload = {
          sub: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          mail: user.mail,
          avatar: user.avatar,
          casa: user.casa,
          es_vip: user.es_vip,
          login: true,
          apodo: user.apodo
        }
        return {access_token: await this.jwtService.signAsync(payload)};
    }
}
