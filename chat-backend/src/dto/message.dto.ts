import {IsNotEmpty, IsString} from "class-validator";

export class MessageDto {
    @IsString()
    @IsNotEmpty()
    value: string;

    @IsString()
    @IsNotEmpty()
    sender: string;

    @IsString()
    @IsNotEmpty()
    senderMail: string;
}
