import { Document } from 'mongoose'
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop() value: string;
    @Prop() sender: string;
    @Prop() senderMail: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

