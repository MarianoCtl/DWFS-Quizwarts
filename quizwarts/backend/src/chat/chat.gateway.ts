import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

import { ChatEnSalaDto } from 'src/chat-en-sala/chat-en-sala.dto';
import { ChatEnSalaService } from '../chat-en-sala/chat-en-sala.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class ChatGateway implements OnModuleInit {

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      socket.join('1');
      socket.on('joinRoom', (roomId: string) => {
        socket.leave('1');
        socket.join(roomId);
      });
      socket.on('sendMessage', (message: ChatEnSalaDto) => {
        if (message.salaId.toString() === '1') {
          socket.to('1').emit('sendMessage', message);
        } else {
          socket.to(message.salaId.toString()).emit('sendMessage', message);
        }
      });
      socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
      });
    });
  }
}