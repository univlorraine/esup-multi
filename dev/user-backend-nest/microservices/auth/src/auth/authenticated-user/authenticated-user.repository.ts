import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticatedUserDto } from './authenticated-user.dto';
import {
  AuthenticatedUser,
  AuthenticatedUserDocument,
} from './authenticated-user.schema';

@Injectable()
export class AuthenticatedUserRepository {
  private readonly logger = new Logger(AuthenticatedUserRepository.name);
  constructor(
    @InjectModel(AuthenticatedUser.name)
    private authenticatedUserModel: Model<AuthenticatedUserDocument>,
  ) {}

  public async saveAuthenticatedUser(
    authenticatedUser: AuthenticatedUserDto,
  ): Promise<AuthenticatedUserDocument> {
    const authenticatedUserModel = new this.authenticatedUserModel(
      authenticatedUser,
    );
    return authenticatedUserModel.save();
  }

  public async getAuthenticatedUser(
    authToken: string,
  ): Promise<AuthenticatedUserDocument> {
    return this.authenticatedUserModel
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

  public async removeAuthenticatedUserLastUsedBefore(limitDate: Date) {
    const outOfDate = await this.authenticatedUserModel.find({
      lastUsedAt: { $lt: limitDate },
    });
    if (outOfDate.length === 0) {
      return;
    }
    this.logger.debug(
      'Following authenticated users data will be removed : ',
      outOfDate,
    );

    return this.authenticatedUserModel
      .deleteMany({
        lastUsedAt: { $lt: limitDate },
      })
      .exec();
  }

  public async removeAuthenticatedUser(authToken: string) {
    return this.authenticatedUserModel
      .findOneAndDelete({
        authToken,
      })
      .exec();
  }
}
