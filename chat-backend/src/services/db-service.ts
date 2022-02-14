import {Injectable} from "@nestjs/common";
import {Message, MessageDocument} from "../schemas/message.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {MessageDto} from "../dto/message.dto";


@Injectable()
export class DbService {

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {
    }

    insertMessage(message: MessageDto) {
        const createdMessage = new this.messageModel(message);
        return createdMessage.save();
    }

    getMessages() {
        return this.messageModel.find();
    }

}