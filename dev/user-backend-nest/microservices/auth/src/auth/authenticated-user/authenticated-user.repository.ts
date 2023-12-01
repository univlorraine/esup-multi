/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

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
