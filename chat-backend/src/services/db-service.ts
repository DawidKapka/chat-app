import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from '../schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from '../dto/message.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserInfoDto } from '../dto/userInfo.dto';


@Injectable()
export class DbService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  insertMessage(message: MessageDto) {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }

  getMessages() {
    return this.messageModel.find();
  }

  getAllUsers() {
    return this.userModel.find();
  }

  async createUser(user: UserInfoDto) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise(function (resolve) {
      that.checkIfUserExists(user).then((res) => {
        if (!res) {
          const createdUser = new that.userModel(user);
          createdUser.save();
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  async checkIfUserExists(user: UserInfoDto): Promise<boolean> {
    return this.userModel.exists({
      username: user.username,
      email: user.email,
    });
  }

  async getUserCredentials(
    user: UserInfoDto,
  ): Promise<{ auth: boolean; userInfo }> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise(function (resolve) {
      that.userModel
        .findOne({ username: user.username, passwordHash: user.passwordHash })
        .then((obj) => {
          if (obj) {
            resolve({
              auth: true,
              userInfo: {
                username: obj.username,
                email: obj.email,
                passwordHash: obj.passwordHash,
              },
            });
          }
          resolve({ auth: false, userInfo: null });
        });
    });
  }

  async addFriendToUser(info: {
    userId: string;
    friendId: string;
  }): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Promise(function (resolve) {
      that.userModel.findById(info.userId).exec((error, record) => {
        record.friends.push(info.friendId);
        record.save();
        resolve(true);
      });
    });
  }

  findUserIdByEmail(email: string) {
    return new Promise((resolve) => {
      this.userModel.findOne({ email: email }).exec((error, record) => {
        resolve(record._id);
      });
    });
  }
}
