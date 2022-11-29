import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserCardsDto } from './cards.dto';
import { CardsService } from './cards.service';

@Controller()
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @MessagePattern({ cmd: 'cards' })
  getUserCards(username: string): Observable<UserCardsDto> {
    return this.cardsService.getUserCards(username);
  }
}
