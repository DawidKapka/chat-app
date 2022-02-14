import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {DbService} from "./services/db-service";
import {MongooseModule} from "@nestjs/mongoose";
import { MessageSchema } from './schemas/message.schema';


@Module({
  imports: [
      MongooseModule.forRoot(
          'mongodb+srv://root:v4pbqIFy8qLrDtHM@chatapp.rzk4l.mongodb.net/chat-app',
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
