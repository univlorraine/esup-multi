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

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { ClockingQueryDto, ClockingReplyDto } from './clocking.dto';
import { ClockingService } from './clocking.service';

@Controller()
export class ClockingController {
  constructor(
    private clockingService: ClockingService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: 'clocking' })
  async getClocking(query: ClockingQueryDto): Promise<ClockingReplyDto> {
    const cacheKey = `clocking-${JSON.stringify(query)}`;

    const cachedClocking = await this.cacheManager.get<ClockingReplyDto>(
      cacheKey,
    );
    if (cachedClocking !== undefined) {
      return cachedClocking;
    }

    const clocking = await firstValueFrom(
      this.clockingService.getClocking(query),
    );

    const ttl = this.configService.get<number>('cacheTtl') || 300;
    await this.cacheManager.set(cacheKey, clocking, ttl);

    return clocking;
  }

  @MessagePattern({ cmd: 'clockIn' })
  async clockIn(query: ClockingQueryDto): Promise<ClockingReplyDto> {
    const cacheKey = `clocking-${JSON.stringify(query)}`;
    await this.cacheManager.del(cacheKey);

    return await firstValueFrom(this.clockingService.clockIn(query));
  }
}
