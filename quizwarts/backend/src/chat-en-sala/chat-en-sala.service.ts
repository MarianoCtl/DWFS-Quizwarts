import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEnSala } from './chat-en-sala.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { SalasService } from 'src/salas/salas.service';
import { ChatEnSalaDto } from './chat-en-sala.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { SalasDto } from 'src/salas/salas.dto';

@Injectable()
export class ChatEnSalaService{
    constructor(
        @InjectRepository(ChatEnSala)
        private readonly chatEnSalaRepository: Repository<ChatEnSala>,

        private readonly usuariosService: UsuariosService,
        
        private readonly salasService: SalasService,
    ) {}

    // Devuelve un chat de una Sala por su ID.
    async getChatSalaPorId(salaId: number): Promise<ChatEnSalaDto[]>{
        try{
            const sala = await this.salasService.getSalaPorId(salaId);
            if (!sala){
                throw new NotFoundException('Sala no encontrada');
            }

            const chatEnSala = await this.chatEnSalaRepository.find({
                where: { sala: { id: salaId } },
                relations: ['usuario'],
            });

            if (chatEnSala.length === 0){
                return [];
            }

            return chatEnSala.map(chat => plainToInstance(ChatEnSalaDto,{
                id: chat.id,
                mensaje_texto: chat.mensaje_texto,
                fecha_envio: chat.fecha_envio,
                usuarioId: chat.usuario.id,
                apodo: chat.usuario.apodo,
                avatar: chat.usuario.avatar
            }));
        } catch (error){
            if (error instanceof NotFoundException){
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor');
        }
    }

    // Crea un nuevo Chat.
    async createChat(chatDto: ChatEnSalaDto): Promise<ChatEnSalaDto>{
        try{
            // Validar DTO.
            const validacionDto = await validate(chatDto);
            if (validacionDto.length > 0){
                throw new BadRequestException('Error en la validación del DTO');
            }

            const usuario = await this.usuariosService.getUsuarioPorId(chatDto.usuarioId);
            if (!usuario){
                throw new NotFoundException('Usuario no encontrado');
            }

            const sala = await this.salasService.getSalaPorId(chatDto.salaId);
            if (!sala){
                throw new NotFoundException('Sala no encontrada');
            }

            const nuevoChat = new ChatEnSala();
            nuevoChat.mensaje_texto = chatDto.mensaje_texto;
            nuevoChat.usuario = usuario;
            const salaDto = plainToInstance(SalasDto, sala);
            nuevoChat.sala = salaDto; 

            const chatCreado = await this.chatEnSalaRepository.save(nuevoChat);
            
            return plainToInstance(ChatEnSalaDto, chatCreado);
        } catch (error){
            if (error instanceof NotFoundException || error instanceof BadRequestException){
                throw error;
            }
            throw new InternalServerErrorException('Error interno del servidor');
        }
    }
}