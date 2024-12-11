import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatEnSalaModule } from 'src/chat-en-sala/chat-en-sala.module';

@Module({
  imports:[ChatEnSalaModule],
  providers: [ChatGateway],
})
export class ChatModule {}
