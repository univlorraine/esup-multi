import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveUserCredentialsDto } from './user-credentials.dto';
import {
  UserCredentials,
  UserCredentialsDocument,
} from './user-credentials.schema';

@Injectable()
export class UserCredentialsRepository {
  constructor(
    @InjectModel(UserCredentials.name)
    private userCredentialsModel: Model<UserCredentialsDocument>,
  ) {}

  public async saveCredentials(
    savedCredentials: SaveUserCredentialsDto,
  ): Promise<UserCredentialsDocument> {
    const userCredentialsModel = new this.userCredentialsModel(
      savedCredentials,
    );
    return userCredentialsModel.save();
  }

  public async getCredentials(id: string): Promise<UserCredentialsDocument> {
    return this.userCredentialsModel
      .findByIdAndUpdate(id, {
        lastUsedAt: new Date(),
      })
      .exec();
  }

  public async removeCredentialsLastUsedBefore(limitDate: Date) {
    return this.userCredentialsModel
      .deleteMany({
        lastUsedAt: { $lt: limitDate },
      })
      .exec();
  }

  public async removeCredentialsById(id: string) {
    return this.userCredentialsModel.findByIdAndDelete(id).exec();
  }
}
