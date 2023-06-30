import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserCardsDto } from './cards.dto';
import { CardsService } from './cards.service';
import * as infosJsonData from '../infos.json';

@Controller()
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @MessagePattern({ cmd: 'cards' })
  getUserCards(username: string): Observable<UserCardsDto> {
    return this.cardsService.getUserCards(username);
  }

  @MessagePattern({ cmd: 'health' })
  getHealthStatus() {
    return {
      message: 'up',
      name: infosJsonData.name,
      version: infosJsonData.version,
    };
  }

  @MessagePattern({ cmd: 'version' })
  getVersion() {
    return {
      version: infosJsonData.version,
    };
  }
}
