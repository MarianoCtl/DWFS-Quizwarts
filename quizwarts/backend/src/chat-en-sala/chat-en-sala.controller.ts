import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { ChatEnSalaService } from './chat-en-sala.service';
import { ChatEnSalaDto } from './chat-en-sala.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('chat-en-sala')
export class ChatEnSalaController{
    constructor(private readonly chatEnSalaService: ChatEnSalaService){}

    @Get('/sala/:salaId')
    async getChatSalaPorId(@Param('salaId', ParseIntPipe) salaId: number, @Res() response): Promise<ChatEnSalaDto[]>{
        const chatEnSala = await this.chatEnSalaService.getChatSalaPorId(salaId);
        return response.status(HttpStatus.OK).json(chatEnSala);
    }

    @Post()
    async createChat(@Body() chatDto: ChatEnSalaDto, @Res() response): Promise<ChatEnSalaDto>{
        const nuevoChat = await this.chatEnSalaService.createChat(chatDto);
        return response.status(HttpStatus.CREATED).json(nuevoChat);
    }
}