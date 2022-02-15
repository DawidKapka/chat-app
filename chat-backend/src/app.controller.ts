import {Body, Controller, Get, Post} from '@nestjs/common';
import {DbService} from "./services/db-service";
import {MessageDto} from "./dto/message.dto";

@Controller('messages')
export class AppController {
  constructor(private dbService: DbService) {}

  @Post()
  saveMessage(@Body() message) {
    const msgDto = message as MessageDto;
    this.dbService.insertMessage(msgDto);
  }

  @Get()
  getMessages() {
    return this.dbService.getMessages();
  }
}

