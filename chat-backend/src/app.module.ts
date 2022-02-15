import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {DbService} from "./services/db-service";
import {MongooseModule} from "@nestjs/mongoose";
import { MessageSchema } from './schemas/message.schema';
import { UserController } from './user/user.controller';
import {UserSchema} from "./schemas/user.schema";

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
          },
          {
              name: 'User',
              schema: UserSchema,
              collection: 'users'
          }
      ], 'chatApp'),

  ],
  controllers: [AppController, UserController],
  providers: [DbService],
})
export class AppModule {}
