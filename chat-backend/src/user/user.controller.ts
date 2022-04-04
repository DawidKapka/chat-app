import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { DbService } from '../services/db-service';
import { UserInfoDto } from '../dto/userInfo.dto';

@Controller('user')
export class UserController {
  constructor(private dbService: DbService) {}

  @Post('register')
  async registerUser(@Body() userInfo: UserInfoDto, @Res() res) {
    const auth = await this.dbService.createUser(userInfo);
    res.send({ auth: auth, errors: [!auth ? 'User already exists!' : null] });
  }

  @Post('login')
  async authenticateUser(@Body() userInfo: UserInfoDto, @Res() res) {
    const userInfos = await this.dbService.getUserCredentials(userInfo);
    res.send({
      auth: userInfos.auth,
      userInfo: userInfos.userInfo,
      errors: [!userInfos.auth ? 'Incorrect username or password!' : null],
    });
  }

  @Get('all')
  getAllUsers() {
    return this.dbService.getAllUsers();
  }

  @Post('friends/add')
  async addFriendToUser(
    @Body() info: { userId: string; friendId: string },
    @Res() res,
  ) {
    const added = await this.dbService.addFriendToUser(info);
    res.send(added);
  }

  @Post('id')
  async getUserIdByEmail(@Body() body: { email: string }, @Res() res) {
    const id = await this.dbService.findUserIdByEmail(body.email);
    res.send({ id: id });
  }

  @Get(':id/friends')
  getUserFriends(@Param('id') id: string) {
    return this.dbService.getUserFriends(id);
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.dbService.findUserById(id);
  }
}
