import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {DbService} from "./services/db-service";
import {MongooseModule} from "@nestjs/mongoose";
import { MessageSchema } from './schemas/message.schema';

var configJson = require('../dbCredentials.json');

@Module({
  imports: [
      MongooseModule.forRoot(
          `mongodb+srv://${configJson.user}:${configJson.password}@chatapp.rzk4l.mongodb.net/chat-app`,
          {
            connectionName: 'chatApp'
          }
      ),
      MongooseModule.forFeature([
          {
              name: 'Message',
              schema: MessageSchema,
              collection: 'messages'
          }
      ], 'chatApp'),
  ],
  controllers: [AppController],
  providers: [DbService],
})
export class AppModule {}
