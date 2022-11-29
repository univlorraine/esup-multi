import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsernameDto } from './username.dto';
import { Username, UsernameDocument } from './username.schema';

@Injectable()
export class UsernameRepository {
  constructor(
    @InjectModel(Username.name)
    private usernameModel: Model<UsernameDocument>,
  ) {}

  public async saveUsername(username: UsernameDto): Promise<UsernameDocument> {
    const userCredentialsModel = new this.usernameModel(username);
    return userCredentialsModel.save();
  }

  public async getUsername(authToken: string): Promise<UsernameDocument> {
    return this.usernameModel
      .findOneAndUpdate(
        {
          authToken,
        },
        {
          lastUsedAt: new Date(),
        },
      )
      .exec();
  }

  public async removeUsernameLastUsedBefore(limitDate: Date) {
    return this.usernameModel
      .deleteMany({
        lastUsedAt: { $lt: limitDate },
      })
      .exec();
  }

  public async removeUsername(authToken: string) {
    return this.usernameModel
      .findOneAndDelete({
        authToken,
      })
      .exec();
  }
}
